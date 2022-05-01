import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

//Calling
import * as Linking from "expo-linking";
//Texting
import * as SMS from "expo-sms";

import { auth } from "../components/firebase";
import Colour from "../static/Colour";

const Home = ({ navigation }) => {
  //Calling
  const callNumber = async () => {
    Linking.openURL("tel://999");
  };

  //Texting
  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(
      //TODO: Send location and custom message?
      ["7928248043", "7974730693"],
      "Ignore this please, just testing my applications automated texting feature :)"
    );
  };

  const signOut = () => {
    try {
      auth.signOut().then(() => {
        navigation.replace("Login");
      });
    } catch (e) {
      alert("Failed to log out");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          flex: 2,
          //   backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={[styles.signoutButton]} onPress={signOut}>
          <Text style={styles.signoutText}>Sign out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonBar]}
          onPress={() => navigation.navigate("Location")}
        >
          <Text style={styles.buttonText}>Location</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          //   backgroundColor: "darkorange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[styles.buttonBar]}
          onPress={() => navigation.navigate("Contact")}
        >
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          //   backgroundColor: "yellow",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={[styles.buttonBar]} onPress={() => {}}>
          <Text style={styles.buttonText}>Resources?</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 2,
          //   backgroundColor: "green",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 10,
            // backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonBox]} onPress={sendSMS}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            // backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={[styles.buttonBox]} onPress={callNumber}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text>Home screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text> */}
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    backgroundColor: Colour.blue,
    // flex: 1,
    width: "100%",
    height: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    backgroundColor: Colour.blue,
    width: "100%",
    height: "50%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colour.white,
    fontWeight: "700",
    fontSize: 16,
  },
  signoutButton: {
    backgroundColor: Colour.red,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  signoutText: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
