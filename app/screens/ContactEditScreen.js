import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ContactEdit = ({ navigation }) => {
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

      <Text>ContactEdit screen</Text>
    </View>
  );
};

export default ContactEdit;

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
