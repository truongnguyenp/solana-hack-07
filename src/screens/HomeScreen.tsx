import { Text, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import React, { useEffect, useState } from "react";
import { TokenInfo } from "../types";
import { ItemSeparatorComponent, forSlide } from './TokenNavigator'
import { TokenCardInfo } from "../components/TokeInfoCard";
import { Stack } from './TokenNavigator'
import { ChartEsportcast } from "./ChartEsportcast";

export function HomeScreen() {
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
      name: 'SKT_DWG',
      symbol: require('../../assets/teamLogo/SKT.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    'FXdxsZhNYGSBdne2LZ448SJ1QDXk8KaEzvKivCvc38h3': {
      name: 'SKT_IG',
      symbol: require('../../assets/teamLogo/SKT.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    '7XBMMSWMfXwshMWoPj7CL2WxudW5dY6UZCUVc3dDjaEG': {
      name: 'FNC_TL',
      symbol: require('../../assets/teamLogo/FNC.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    'HNtzvJgduuyNsFDnqH4GyHDqNQJShJMxzUcGnUW9xeWi': {
      name: 'G2_DWG',
      symbol: require('../../assets/teamLogo/G2.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    '41QaQpUGPqLkDVae3cVxesZeZRh82G6ZpSaX86x5w8bk': {
      name: 'RNG_TL',
      symbol: require('../../assets/teamLogo/RNG.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    '8q7a4FpN9Di6TtT8RDbyZbwz1qmiKwmhNALRstQCbN4K': {
      name: 'C9_SKT',
      symbol: require('../../assets/teamLogo/C9.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    },
    'GTFBBcnRCT6Pa7rxDQHyYW4KMMebvkhB17dKBRkcHw78': {
      name: 'IG_TL',
      symbol: require('../../assets/teamLogo/IG.png'),
      tokenUsage: [150, 230, 224, 218, 135, 147, 260],
      totalUserBetting: [179, 40, 124, 248, 35, 147, 80]
    }
  }

  const [listTokenInfo, setListTokenInfo] = useState<TokenInfo[]>([])

  const filterFakeTokenByAddress = (tokens: TokenInfo[]) => {
    const listTokensBetting = tokens.filter(token => listFakeTokensAddress.includes(token.address))
    const updatedTokens: TokenInfo[] = listTokensBetting.map(tokenBetting => {
      const { name, symbol } = fakeSymbolAndNameToken[tokenBetting.address];
      return { ...tokenBetting, name, symbol};
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
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        data={listTokenInfo}
        keyExtractor={(item) => item.address}
        ItemSeparatorComponent={ItemSeparatorComponent}

        renderItem={({ item }) => {
          return (
            <TokenCardInfo
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
        name="tokenInfoList"
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

        options={{
          title: "Predicting game detail", headerStyle: {
            backgroundColor: "#161723",
          }, headerTitleStyle: {
            color: "white",
            // Add other title style properties as needed
          },
        }}
      />
    </Stack.Navigator>
  )
}
