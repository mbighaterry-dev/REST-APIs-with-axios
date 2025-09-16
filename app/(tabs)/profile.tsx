import { View, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Profile() {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "light" ? "#fff" : "#222",
      }}
    >
      <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>
       profile page
      </Text>
    </View>
  );
}