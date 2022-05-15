import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

//Texting
import * as SMS from "expo-sms";
//Calling
import * as Linking from "expo-linking";

import { auth } from "../components/firebase";
import { getContacts, setLocation } from "../components/firestore";
import styles from "../static/Styles";

const Home = ({ navigation }) => {
  let email = auth.currentUser?.email;

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
    // Get location
    console.log("Get location");

    let location = await ExpoLocation.getCurrentPositionAsync({});

    let latitude = parseFloat(JSON.stringify(location.coords.latitude));
    let longitude = parseFloat(JSON.stringify(location.coords.longitude));

    let message = "This is an alert for my location: latitude, longitude: ";
    let coords = latitude + " , " + longitude;
    message = message + coords;

    setLocationMessage(message);

    // Save location to database
    setLocation(email, latitude, longitude);
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

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      // console.log("Screen focused");

      permissions();
      runGetContacts();
      runGetLocation();

      return () => {
        // Do something when the screen is unfocused/unmount. Useful for cleanup functions
        // console.log("Screen unfocused");
        // setContactList({});
        // setLocationMessage({});
      };
    }, [])
  );

  // Texting
  const sendSMS = async () => {
    //TODO: If no message or contacts yet?
    const { result } = await SMS.sendSMSAsync(contactList, locationMessage);

    // console.log("Contact list: ", contactList);
    // console.log("Location message: ", locationMessage);
  };

  // Calling
  const callingAlert = () =>
    Alert.alert("Emergency Call", "Choose which contact to call", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
      {
        text: "University",
        onPress: () => Linking.openURL("tel://01202962222"),
      },
      { text: "Police", onPress: () => Linking.openURL("tel://999") },
    ]);

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
    <View style={[styles.homeContainer]}>
      <View style={[styles.containerBuffer]}>
        {/* <Text style={styles.buttonText}>Email: {auth.currentUser?.email}</Text> */}
        <View
          style={{
            paddingVertical: 2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={[styles.signoutButton]} onPress={signOut}>
            <Text style={styles.signoutText}>Sign out</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() => navigation.navigate("Location")}
          >
            <Text style={styles.buttonText}>Plan Journey</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() => navigation.navigate("Contact")}
          >
            <Text style={styles.buttonText}>Add/Edit Contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() => navigation.navigate("Resources")}
          >
            <Text style={styles.buttonText}>Resources & Information</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer]}>
          <View style={[styles.squareButtonContainer]}>
            <TouchableOpacity style={[styles.homeButtonBox]} onPress={sendSMS}>
              <Text style={styles.buttonText}>Alert contacts</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.squareButtonContainer]}>
            <TouchableOpacity
              style={[styles.homeButtonBox]}
              onPress={callingAlert}
            >
              <Text style={styles.buttonText}>
                Emergency Call Police / University
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Home;
