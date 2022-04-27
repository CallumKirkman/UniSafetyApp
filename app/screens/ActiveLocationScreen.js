import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Colour from "../static/Colour";

const ActiveLocaiton = ({ navigation, route }) => {
  let yourPin = route.params.yourPin;
  let destination = route.params.destination;

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
          }} // Destination pin
          apikey={"AIzaSyBuE5BvZEN8DEEqfxMC19gpgLLUF3Lh5Yw"}
          strokeWidth={4}
          strokeColor="#111111"
          mode="WALKING"
        />

        <Marker
          coordinate={yourPin}
          pinColor="black"
          // TODO: Set location
        >
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
