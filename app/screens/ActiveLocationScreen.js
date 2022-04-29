import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { auth } from "../components/firebase";
import { setLocation } from "../components/firestore";
import Colour from "../static/Colour";

const ActiveLocaiton = ({ navigation, route }) => {
  let email = auth.currentUser?.email;

  let yourParams = route.params.yourPin;
  let destinationParams = route.params.destination;

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

  const MINUTE_MS = 30000;
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      // console.log("Screen focused");

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

  const endTripAlert = () =>
    Alert.alert("Stop Trip", "Are you sure?", [
      {
        text: "No",
        onPress: () => console.log("No Pressed"),
        style: "destructive",
      },
      { text: "Yes", onPress: () => navigation.navigate("Location") },
    ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        <Marker coordinate={yourPin} pinColor="black">
          <Callout>
            <Text>You</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }} // Destination pin
          draggable={false}
        >
          <Callout>
            <Text>Your destination</Text>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={endTripAlert}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActiveLocaiton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  topButton: {
    padding: 5,
    flexDirection: "row",
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: Colour.red,
    width: "50%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: Colour.white,
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
  },
});
