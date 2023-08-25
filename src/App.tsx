import { registerRootComponent } from 'expo';
import { RecoilRoot } from 'recoil';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Inter_900Black } from '@expo-google-fonts/dev';

import { ExamplesScreens } from './screens/ExamplesScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TokenListNavigator } from './screens/TokenNavigator';
import { NftScreen } from './screens/NftScreen';
import XnftContextProvider, {
  IFRAME_ORIGIN,
  useXnft,
} from './provider/XnftProvider';
import tw from 'twrnc';
import { useTheme } from './hooks/useTheme';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Tokens',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Examples"
        component={ExamplesScreens}
        options={{
          tabBarLabel: 'Examples',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NFT"
        component={NftScreen}
        options={{
          tabBarLabel: 'NFT',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function Iframe() {
  const { setAppIframeElement } = useXnft();

  return (
    <iframe
      allow={`fullscreen;clipboard-write ${IFRAME_ORIGIN}`}
      // sandbox='allow-same-origin allow-scripts allow-forms allow-popups'
      src={IFRAME_ORIGIN}
      style={tw`border-0 w-full h-full`}
      ref={(node) => {
        if (node) {
          setAppIframeElement(node);
        }
      }}
    />
  );
}
function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  const {custom} = useTheme();
  return (
    <XnftContextProvider>
      <RecoilRoot>
        <NavigationContainer
        theme={custom}
        >
          <TabNavigator />
        </NavigationContainer>
      </RecoilRoot>
    </XnftContextProvider>
  );
}

export default registerRootComponent(App);
