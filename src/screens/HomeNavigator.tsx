import { Text, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import React, { useEffect, useState } from "react";
import { DataNavigateToChart, TokenInfo } from "../types";
import { ItemSeparatorComponent, RootStackParamList, forSlide } from './TokenNavigator'
import { TokenCardInfo } from "../components/TokeInfoCard";
import { Stack } from './TokenNavigator'
import { ChartEsportcast } from "./ChartEsportcast";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList,"List">) {
  const handlePressTokenRow = (id: string) => {
    const data: DataNavigateToChart = {
      name: listTokenInfo.find(token => token.address === id)?.name ?? '',
      tokenUsage: fakeSymbolAndNameToken[id].tokenUsage,
      totalUserBetting: fakeSymbolAndNameToken[id].totalUserBetting
    }

    navigation.push("Detail", { ...data });    
  };
  const listFakeTokensAddress = [
    'DK64rmGSZupv1dLYn57e3pUVgs9jL9EKLXDVZZPsMDz8',
    'FXdxsZhNYGSBdne2LZ448SJ1QDXk8KaEzvKivCvc38h3',
    '7XBMMSWMfXwshMWoPj7CL2WxudW5dY6UZCUVc3dDjaEG',
    'HNtzvJgduuyNsFDnqH4GyHDqNQJShJMxzUcGnUW9xeWi',
    '41QaQpUGPqLkDVae3cVxesZeZRh82G6ZpSaX86x5w8bk',
    '8q7a4FpN9Di6TtT8RDbyZbwz1qmiKwmhNALRstQCbN4K',
    'GTFBBcnRCT6Pa7rxDQHyYW4KMMebvkhB17dKBRkcHw78'
  ]

  const fakeSymbolAndNameToken: {
    [address: string]: {
      name: string;
      symbol: string,
      tokenUsage: number[],
      totalUserBetting: number[]
    }
  } = {
    'DK64rmGSZupv1dLYn57e3pUVgs9jL9EKLXDVZZPsMDz8': {
      name: 'FNCvsIG',
      symbol: require('../../assets/teamLogo/FNC.png'),
      tokenUsage: [23, 23, 24, 48, 135, 147, 260],
      totalUserBetting: [1, 5, 10, 10, 20, 23, 30]
    },
    'FXdxsZhNYGSBdne2LZ448SJ1QDXk8KaEzvKivCvc38h3': {
      name: 'FNCvsTL',
      symbol: require('../../assets/teamLogo/FNC.png'),
      tokenUsage: [50, 53, 64, 78, 95, 147, 230],
      totalUserBetting: [10, 10, 13, 20, 30, 33, 40]
    },
    '7XBMMSWMfXwshMWoPj7CL2WxudW5dY6UZCUVc3dDjaEG': {
      name: 'G2vsDWG',
      symbol: require('../../assets/teamLogo/G2.png'),
      tokenUsage: [63, 83, 104, 158, 175, 247, 440],
      totalUserBetting: [1, 5, 10, 10, 20, 23, 30]
    },
    'HNtzvJgduuyNsFDnqH4GyHDqNQJShJMxzUcGnUW9xeWi': {
      name: 'RNGvsTL',
      symbol: require('../../assets/teamLogo/RNG.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    '41QaQpUGPqLkDVae3cVxesZeZRh82G6ZpSaX86x5w8bk': {
      name: 'C9vsSKT',
      symbol: require('../../assets/teamLogo/C9.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    '8q7a4FpN9Di6TtT8RDbyZbwz1qmiKwmhNALRstQCbN4K': {
      name: 'IGvsTL',
      symbol: require('../../assets/teamLogo/TL.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    'GTFBBcnRCT6Pa7rxDQHyYW4KMMebvkhB17dKBRkcHw78': {
      name: 'FNCvsG2',
      symbol: require('../../assets/teamLogo/G2.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    }
  }

  const [listTokenInfo, setListTokenInfo] = useState<any[]>([])

  const filterFakeTokenByAddress = (tokens: TokenInfo[]) => {
    const listTokensBetting = tokens.filter(token => listFakeTokensAddress.includes(token.address))
    const updatedTokens: TokenInfo[] = listTokensBetting.map(tokenBetting => {
      if (tokenBetting.address in fakeSymbolAndNameToken) {
        const { name, symbol } = fakeSymbolAndNameToken[tokenBetting.address];
        return { ...tokenBetting, name, symbol };
      }
      return tokenBetting;
    });

    return updatedTokens;
  }

  useEffect(() => {
    const getDataTokensInSolana = async () => {
      const data = await fetch('https://portfolio-api.sonar.watch/v1/token-infos/allByNetwork/solana');
      const result = await data.json()
      const tokendata: TokenInfo[] = filterFakeTokenByAddress(result)

      setListTokenInfo(tokendata)
    }

    getDataTokensInSolana()
  }, [])

  return (
    <Screen>
      <Text style={tw`mb-4`}>List token information for betting</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        data={listTokenInfo}
        keyExtractor={(item) => item.address}
        ItemSeparatorComponent={ItemSeparatorComponent}

        renderItem={({ item }) => {
          item.name = fakeSymbolAndNameToken[item.address].name
          item.symbol = fakeSymbolAndNameToken[item.address].symbol
          console.log(fakeSymbolAndNameToken[item.address].name)
          console.log(item)

          return (
            <TokenCardInfo 
              onPress={() => handlePressTokenRow(item.address)}
              tokenInfo={item}
            />
          );
        }}
      />
    </Screen>
  );
}

export function TokenInfoChartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen
        name="List"
        component={HomeScreen}
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
        component={ChartEsportcast}
        options={{ title: "Predicting game detail",   headerStyle: {
          backgroundColor: "#161723",
          
        },  headerTitleStyle: {
          color: "white",
          // Add other title style properties as needed
        },
        headerTintColor: "white",
      }}
      />
    </Stack.Navigator>
  )
}
