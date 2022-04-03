import React from "react";
import { Text, View, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home screen</Text>

      <Button
        title="Location"
        onPress={() => navigation.navigate("Location")}
      />
      <Button title="Contact" onPress={() => navigation.navigate("Contact")} />
      <Button
        title="ContactAdd"
        onPress={() => navigation.navigate("ContactAdd")}
      />
      <Button
        title="ContactEdit"
        onPress={() => navigation.navigate("ContactEdit")}
      />
    </View>
  );
};

export default Home;
