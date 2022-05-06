import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

//Texting
import * as SMS from "expo-sms";
//Calling
import * as Linking from "expo-linking";

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
        let message = "This is an alert for my location: latitude, longitude: ";

        let coords = location.latitude + " " + location.longitude;

        message = message + coords;

        setLocationMessage(message);
        // console.log(message);
      } else {
        setLocationMessage("No location found, please check");
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

  // Texting
  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync(contactList, locationMessage);
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

        {/* <Text>Home screen</Text>
      <Text>Email: {auth.currentUser?.email}</Text> */}
      </View>
    </View>
  );
};
export default Home;
