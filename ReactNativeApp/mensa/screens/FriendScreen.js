import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const FriendScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Friend Screen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
