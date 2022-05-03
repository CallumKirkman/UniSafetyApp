import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

//Calling
import * as Linking from "expo-linking";
//Texting
import * as SMS from "expo-sms";

import { auth } from "../components/firebase";
import { getContacts, getLocation } from "../components/firestore";
import styles from "../static/Styles";

const Home = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const isFocused = useIsFocused();

  const [contactList, setContactList] = useState([]);
  const [locationMessage, setLocationMessage] = useState("");

  const runGetContacts = async () => {
    let numberArray = [];

    await getContacts(email).then((collection) => {
      collection.forEach((item) => {
        numberArray.push(item.number);
      });
      setContactList(numberArray);
      // console.log(numberArray);
    });
  };

  const runGetLocation = async () => {
    await getLocation(email).then((location) => {
      if (location != "No such document!") {
        //TODO: Allow for custom message alert?
        let message = "This is an alert for my location";

        let coords =
          " - latitude: " +
          location.latitude +
          " longitude: " +
          location.longitude;

        message = message + coords;

        setLocationMessage(message);
        // console.log(message);
      } else {
        ("No location found, please check");
      }
    });
  };

  const permissions = async () => {
    console.log("Permissions check");

    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status == "granted") {
      console.log("Permissions granted");
    } else {
      Alert.alert(
        "This app requires location services to function, please enable these in your phone settings"
      );
    }

    //TODO: Make backround work?
    // let backPerm = await ExpoLocation.requestBackgroundPermissionsAsync();
    // console.log(backPerm);
  };

  useEffect(() => {
    permissions();
    runGetContacts();
    runGetLocation();
  }, [isFocused]);

  //Calling
  const callNumber = async () => {
    Linking.openURL("tel://999");
  };

  //Texting
  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(contactList, locationMessage);
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
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 20,
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
          <Text style={styles.buttonText}>Resources</Text>
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
          <TouchableOpacity style={[styles.homeButtonBox]} onPress={sendSMS}>
            <Text style={styles.buttonText}>Alert contacts</Text>
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
          <TouchableOpacity style={[styles.homeButtonBox]} onPress={callNumber}>
            <Text style={styles.buttonText}>Emergency Services</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text>Home screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text> */}
    </View>
  );
};
export default Home;
