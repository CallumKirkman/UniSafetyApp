import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Contact = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.topButton}>
        <Button title="Back" onPress={() => navigation.navigate("Home")} />
      </View>

      <Text>Contact screen</Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topButton: {
    padding: 5,
    flexDirection: "row",
  },
});
