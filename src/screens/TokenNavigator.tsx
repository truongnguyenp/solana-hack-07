import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { GameRow } from "../components/GameRow"
import { Game } from "../types";
import { HomeScreen } from "./HomeScreen";
import { ExamplesScreens } from "./ExamplesScreen";

type RootStackParamList = {
  List: {};
  Detail?: { id: string };
};

interface Team {
  name: string;
  logo: any;
  score: number;
}
export const Stack = createStackNavigator<RootStackParamList>();

function FullScreenLoadingIndicator() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

async function fetchTokenData(count = 20): Promise<Game[]> {
  const games: Game[] = [
    {
      id: 1,
      team1: {
        name: 'SKT',
        logo: require('../../assets/teamLogo/SKT.png'),
        score: 2,
      },
      team2: {
        name: 'IG',
        logo: require('../../assets/teamLogo/IG.png'),
        score: 1,
      },
    },
    {
      id: 2,
      team1: {
        name: 'FNC',
        logo: require('../../assets/teamLogo/FNC.png'),
        score: 3,
      },
      team2: {
        name: 'TL',
        logo: require('../../assets/teamLogo/TL.png'),
        score: 2,
      },
    },
    {
      id: 3,
      team1: {
        name: 'G2',
        logo: require('../../assets/teamLogo/G2.png'),
        score: 0,
      },
      team2: {
        name: 'DWG',
        logo: require('../../assets/teamLogo/DWG.png'),
        score: 2,
      },
    },
    {
      id: 4,
      team1: {
        name: 'RNG',
        logo: require('../../assets/teamLogo/RNG.png'),
        score: 1,
      },
      team2: {
        name: 'TL',
        logo: require('../../assets/teamLogo/C9.png'),
        score: 2,
      },
    },
    {
      id: 5,
      team1: {
        name: 'C9',
        logo: require('../../assets/teamLogo/C9.png'),
        score: 1,
      },
      team2: {
        name: 'SKT',
        logo: require('../../assets/teamLogo/SKT.png'),
        score: 2,
      },
    },
    {
      id: 5,
      team1: {
        name: 'IG',
        logo: require('../../assets/teamLogo/IG.png'),
        score: 1,
      },
      team2: {
        name: 'TL',
        logo: require('../../assets/teamLogo/TL.png'),
        score: 2,
      },
    },
    {
      id: 2,
      team1: {
        name: 'FNC',
        logo: require('../../assets/teamLogo/FNC.png'),
        score: 3,
      },
      team2: {
        name: 'G2',
        logo: require('../../assets/teamLogo/G2.png'),
        score: 2,
      },
    },
  ];
  
  // const games: Game[] = [
  //   {
  //     id: "1",
  //     team1: {
  //       name: 'SKT',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //     team2: {
  //       name: 'IG',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 1,
  //     },
  //   },
  //   {
  //     id: "2",
  //     team1: {
  //       name: 'FNC',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 3,
  //     },
  //     team2: {
  //       name: 'TL',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  //   {
  //     id: "3",
  //     team1: {
  //       name: 'G2',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 0,
  //     },
  //     team2: {
  //       name: 'DWG',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  //   {
  //     id: "4",
  //     team1: {
  //       name: 'RNG',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 1,
  //     },
  //     team2: {
  //       name: 'TL',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  //   {
  //     id: "5",
  //     team1: {
  //       name: 'C9',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 1,
  //     },
  //     team2: {
  //       name: 'SKT',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  //   {
  //     id: "5",
  //     team1: {
  //       name: 'IG',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 1,
  //     },
  //     team2: {
  //       name: 'TL',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  //   {
  //     id: "2",
  //     team1: {
  //       name: 'FNC',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 3,
  //     },
  //     team2: {
  //       name: 'G2',
  //       logo: require('../../assets/teamLogo/SKT.png'),
  //       score: 2,
  //     },
  //   },
  // ];

  return  games;
}

function useTokenData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Game[]>([]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await fetchTokenData();
      console.log("data", data);
      setData(data);
      setLoading(false);
    }

    fetch();
  }, []);

  return { data, loading };
}

export const ItemSeparatorComponent = () => (
  <View
    style={{ marginVertical: 8,}}
  />
);

function List({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "List">) {
  const { data, loading } = useTokenData();

  const handlePressGameRow = (id: string) => {
    navigation.push("Detail", { id });
  };

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  

  return (
    <Screen
      style={{backgroundColor: "#161723"}}
    >
      <FlatList
      showsHorizontalScrollIndicator={false}
        style={{ flex: 1}}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}

        renderItem={({ item }) => {
          return (
            <GameRow
              game={item}
              onPress={handlePressGameRow}
              style={{marginBottom: "30px"}}
            />
          );
        }}
      />
    </Screen>
  );
}

function Detail({
  route,
}: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { data, loading } = useTokenData();
  const { id } = route.params;

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const item = data.find((d) => d.id === id);

  if (!item) {
    return null;
  }

  return (
    <Screen>
      <View style={tw`bg-yellow-100 items-center justify-center p-4`}>
        <Image source={{ uri: item.team1.logo }} style={tw`w-8 h-8 rounded m-4`} />
        <Text style={tw`font-bold text-lg`}>{item.team1.name}</Text>
        <Text style={tw`font-bold text-lg`}>Symbol: {item.id}</Text>
        <Text style={tw`font-bold text-lg`}>
          Total supply: {item.team1.name}
        </Text>
        <Text style={tw`font-bold text-lg`}>All time high: {item.id}</Text>
      </View>
    </Screen>
  );
}

export const forSlide: StackCardStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: "clamp",
            }),
            inverted,
          ),
        },
      ],
    },
  };
};

export const TokenListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen
        name="List"
        component={List}
        options={{ 
          title: "Battles",
          headerStyle: {
            backgroundColor: "#161723",
          },
          headerTitleStyle: {
            color: "white",
            // Add other title style properties as needed
          },
        }}
      />

      <Stack.Screen
        name="Detail"
        component={ExamplesScreens}
       
        options={{ title: "Predicting game detail",   headerStyle: {
          backgroundColor: "#161723",
        },  headerTitleStyle: {
          color: "white",
          // Add other title style properties as needed
        }, }}
      />
    </Stack.Navigator>
  );
};
