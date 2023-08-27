import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import tw from "twrnc";

import { TokenInfo } from '../types'
import { TouchableOpacity } from "react-native-gesture-handler";

interface TokenCardInfoProps {
  tokenInfo: any
  onPress?: () => void
}

export function TokenCardInfo({ tokenInfo, onPress }: TokenCardInfoProps) {
  return (
    <TouchableOpacity onPress={onPress} key={tokenInfo.address} style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
      <View style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}>
        <View>
          <Text style={tw`text-xl font-semibold`}>Token Data:</Text>
          <Text style={tw`text-lg`}>Name: {tokenInfo.name}</Text>
        </View>
        <Image source={{ uri: tokenInfo.symbol }} style={styles.image} />
      </View>
      <Text style={tw`text-lg`}>Address: {tokenInfo.address}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
})