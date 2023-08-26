import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

import { TokenInfo } from '../types'
import { TouchableOpacity } from "react-native-gesture-handler";

interface TokenCardInfoProps {
  tokenInfo: TokenInfo
  onPress?: () => void
}

export function TokenCardInfo({ tokenInfo, onPress }: TokenCardInfoProps) {
  return (
    <TouchableOpacity onPress={onPress} key={tokenInfo.address} style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
      <Text style={tw`text-xl font-semibold`}>Token Data:</Text>
      <Text style={tw`text-lg`}>Name: {tokenInfo.name}</Text>
      <Text style={tw`text-lg`}>Symbol: {tokenInfo.symbol}</Text>
      <Text style={tw`text-lg`}>Address: {tokenInfo.address}</Text>
    </TouchableOpacity>
  )
}