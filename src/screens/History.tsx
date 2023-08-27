// DecisionHistoryScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ItemSeparatorComponent, List, RootStackParamList, forSlide, useTokenData } from './TokenNavigator';
import { Stack } from './TokenNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GameRow } from '../components/GameRow';
import { FullScreenLoadingIndicator } from '../components/common/LoadingScreen';
import { Screen } from '../components/Screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  decisionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  decisionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestampText: {
    fontSize: 14,
    color: 'gray',
  },
});

export function HistoryList({
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
              isPredicted={true}
              onPress={handlePressGameRow}
              style={{marginBottom: "30px"}}
            />
          );
        }}
      />
    </Screen>
  );
}
export const HistoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen
        name="List"
        component={HistoryList}
        options={{ 
          title: "History",
          headerStyle: {
            backgroundColor: "#161723",
          },
          headerTitleStyle: {
            color: "white",
            // Add other title style properties as needed
          },
        }}
      />
      </Stack.Navigator>
      )}