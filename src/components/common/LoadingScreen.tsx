import { ActivityIndicator, View } from 'react-native';

export function FullScreenLoadingIndicator() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
