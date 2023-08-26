// DecisionHistoryScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DecisionHistoryScreen = () => {
  const [decisionHistory, setDecisionHistory] = useState([]);

  // Simulated data for decision history (replace with actual data)
  const simulatedData = [
    { id: '1', decision: 'Buy', timestamp: '2023-08-25 15:30:00' },
    { id: '2', decision: 'Sell', timestamp: '2023-08-24 10:15:00' },
    // ... more data
  ];

  useEffect(() => {
    // Fetch decision history data from your data source
    // For now, using simulated data
    setDecisionHistory(simulatedData);
  }, []);

  const renderDecisionItem = ({ item }) => (
    <View style={styles.decisionItem}>
      <Text style={styles.decisionText}>{item.decision}</Text>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={decisionHistory}
        keyExtractor={item => item.id}
        renderItem={renderDecisionItem}
      />
    </View>
  );
};

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

export default DecisionHistoryScreen;
