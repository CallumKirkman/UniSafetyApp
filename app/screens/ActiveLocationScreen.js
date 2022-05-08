import React, { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

//Texting
import * as SMS from "expo-sms";
//Calling
import * as Linking from "expo-linking";

import { auth } from "../components/firebaseNew";
import { getContacts, setLocation } from "../components/firestoreNew";
import styles from "../static/Styles";
import Colour from "../static/Colour";

const ActiveLocaiton = ({ navigation, route }) => {
  let email = auth.currentUser?.email;

  let yourParams = route.params.yourPin;
  let destinationParams = route.params.destination;

  const [contactList, setContactList] = useState([]);

  const [yourPin, setYourPin] = React.useState({
    latitude: yourParams["latitude"],
    longitude: yourParams["longitude"],
  });

  const [destination, setDestination] = React.useState({
    latitude: destinationParams["latitude"],
    longitude: destinationParams["longitude"],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  const MINUTE_MS = 30000;
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      // console.log("Screen focused");
      runGetContacts();

      // Get location every minute
      const interval = setInterval(() => {
        console.log("Active location log");

        const locationPing = (async () => {
          let location = await ExpoLocation.getCurrentPositionAsync({});

          let latitude = parseFloat(JSON.stringify(location.coords.latitude));
          let longitude = parseFloat(JSON.stringify(location.coords.longitude));

          setYourPin({
            latitude: latitude,
            longitude: longitude,
          });

          // Save location to database
          setLocation(email, latitude, longitude);
        })();
        // console.log("-- Location end");
        return locationPing;
      }, MINUTE_MS);

      return () => {
        // Do something when the screen is unfocused/unmount. Useful for cleanup functions
        // console.log("Screen unfocused");

        // console.log("-- Interval end");
        clearInterval(interval);

        setYourPin({});
        setDestination({});
      };
    }, [])
  );

  // Texting
  const sendSMS = async () => {
    let message = "This is an alert for my location: latitude, longitude: ";

    let coords = yourPin.latitude + " " + yourPin.longitude;

    message = message + coords;

    const { result } = await SMS.sendSMSAsync(contactList, message);
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

  const endTripAlert = () =>
    Alert.alert("Stop Trip", "Are you sure?", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "destructive",
      },
      { text: "Yes", onPress: () => navigation.navigate("Home") },
    ]);

  return (
    // TODO: Container?
    <View style={{ flex: 1, backgroundColor: Colour.background }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: yourPin.latitude,
          longitude: yourPin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <MapViewDirections
          origin={yourPin}
          destination={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          apikey={"AIzaSyBuE5BvZEN8DEEqfxMC19gpgLLUF3Lh5Yw"}
          strokeWidth={4}
          strokeColor="#111111"
          mode="WALKING"
        />

        <Marker coordinate={yourPin} pinColor="blue">
          <Callout>
            <Text>You</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          draggable={false}
        >
          <Callout>
            <Text>Your destination</Text>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.mapButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={sendSMS}>
          <Text style={styles.buttonText}>Alert contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={callingAlert}>
          <Text style={styles.buttonText}>Emergency Services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={endTripAlert}
        >
          <Text style={styles.buttonText}>Stop Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActiveLocaiton;
