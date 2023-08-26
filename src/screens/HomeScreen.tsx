import { Text, FlatList, View } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import React, { useEffect, useState } from "react";
import { TokenInfo } from "../types";

export function HomeScreen() {
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];


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
      symbol: string
    }
  } = {
    'DK64rmGSZupv1dLYn57e3pUVgs9jL9EKLXDVZZPsMDz8': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    'FXdxsZhNYGSBdne2LZ448SJ1QDXk8KaEzvKivCvc38h3': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    '7XBMMSWMfXwshMWoPj7CL2WxudW5dY6UZCUVc3dDjaEG': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    'HNtzvJgduuyNsFDnqH4GyHDqNQJShJMxzUcGnUW9xeWi': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    '41QaQpUGPqLkDVae3cVxesZeZRh82G6ZpSaX86x5w8bk': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    '8q7a4FpN9Di6TtT8RDbyZbwz1qmiKwmhNALRstQCbN4K': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    },
    'GTFBBcnRCT6Pa7rxDQHyYW4KMMebvkhB17dKBRkcHw78': {
      name: 'FAKE_NAME_HERE',
      symbol: 'FAKE_SYMBOL_HERE'
    }
  }

  const [listTokenInfo, setListTokenInfo] = useState<TokenInfo[]>()

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

      {listTokenInfo && listTokenInfo.map(tokenInfo => (
        <View key={tokenInfo.address} style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
          <Text style={tw`text-xl font-semibold`}>Token Data:</Text>
          <Text style={tw`text-lg`}>Name: {tokenInfo.name}</Text>
          <Text style={tw`text-lg`}>Symbol: {tokenInfo.symbol}</Text>
          <Text style={tw`text-lg`}>Address: {tokenInfo.address}</Text>
        </View>
      ))}
    </Screen>
  );
}
