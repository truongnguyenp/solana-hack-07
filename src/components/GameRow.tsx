import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { Game } from "../types";
import { Divider } from "@rneui/base";
import { AntDesign } from '@expo/vector-icons'; 

type Props = {
 game: Game;
  onPress: (id: string) => void;
  isPredicted: boolean;
};

export function GameRow({game, onPress, isPredicted }: Props) {
  
  return (
    <Pressable onPress={() => onPress?.(game.id)} style={styles.container}>
      <View style={{  alignItems: "center" }}>
        <Image source={{ uri: game.team1.logo }} style={styles.image} />
        <Text style={styles.name}>{game.team1.name}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: "4px" }}>
      <Text style={styles.score}>{isPredicted? game.team1.score: "?"}</Text>
      <Text style={styles.score}> - </Text>
      <Text style={styles.score}>{isPredicted? game.team2.score: "?"}</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: game.team2.logo }} style={styles.image} />
        <Text style={styles.name}>{game.team2.name}</Text>
      </View>

   {   isPredicted && <AntDesign name="checkcircle" size={24} color="green" />}
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
    backgroundColor: '#272639',
    borderRadius: 8,

    elevation: 3,

    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    // borderColor: "#E0E0E0",
    height: 100,
  },
  image: {
    width: 50,
    height: 50,
    // borderRadius: 22,
    // marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  score: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
  },
  divider: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
  },
});