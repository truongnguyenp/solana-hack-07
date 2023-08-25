import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { Game } from "../types";

type Props = {
  game: Game
  onPress: (id: string) => void;
};

export function TokenRow({game }: Props) {
  return (
    <Pressable onPress={() => onPress(id)} style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: game.team1.logo }} style={styles.image} />
        <Text style={styles.name}>{game.team1.name}</Text>
      </View>
      <Text style={styles.price}>${game.team1.score}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
  },
});
