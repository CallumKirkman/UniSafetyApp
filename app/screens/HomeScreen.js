import React from "react";
import { Text, View, Button } from "react-native";

import Colour from "../static/Colour";

//Calling
import * as Linking from "expo-linking";
//Texting
import * as SMS from "expo-sms";

const Home = ({ navigation }) => {
  //Calling
  const callNumber = async () => {
    Linking.openURL("tel://+07928248043");
  };

  //Texting
  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
      ["7928248043", "7974730693"],
      "Ignore this please, just testing my applications automated texting feature :)"
    );
  };

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

      <Button title="Call" color={Colour.red} onPress={callNumber} />
      <Button title="Send" color={Colour.red} onPress={sendSMS} />
    </View>
  );
};

export default Home;
