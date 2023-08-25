import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { Game } from "../types";
import { Divider } from "@rneui/base";

type Props = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  onPress: (id: string) => void;
};

export function TokenRow({game, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress?.(game.id)} style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: "4px" }}>
      <Text style={styles.score}>{game.team1.score}</Text>
      <Divider orientation="vertical" width={5} />
      <Text style={styles.score}>{game.team2.score}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: game.team2.logo }} style={styles.image} />
        <Text style={styles.name}>{game.team2.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    backgroundColor: '#D6FFE5',
    borderColor: "#E0E0E0",
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
  score: {
    fontSize: 18,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 12,
  },
});