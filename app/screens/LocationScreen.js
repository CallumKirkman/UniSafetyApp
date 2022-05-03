import React, { useState, useCallback } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { auth } from "../components/firebase";
import { getLocation } from "../components/firestore";
import styles from "../static/Styles";

const Location = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const [yourPin, setYourPin] = React.useState({
    // Bournemouth
    latitude: 50.718395,
    longitude: -1.883377,

    // 20 St Ives
    // latitude: 50.72932744306023,
    // longitude: -1.8762423593098077,
  });

  const [destination, setDestination] = React.useState({
    // Bournemouth
    latitude: 50.718395,
    longitude: -1.883377,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const runGetLocation = async () => {
    await getLocation(email).then((location) => {
      if (location != "No such document!") {
        setYourPin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      // console.log("Screen focused");

      // Get last known location
      runGetLocation();

      // Get location
      const initialLocation = (async () => {
        console.log("Initial location");

        let location = await ExpoLocation.getCurrentPositionAsync({});

        setYourPin({
          latitude: parseFloat(JSON.stringify(location.coords.latitude)),
          longitude: parseFloat(JSON.stringify(location.coords.longitude)),
        });
      })();

      return () => {
        // Do something when the screen is unfocused/unmount. Useful for cleanup functions
        // console.log("Screen unfocused");

        initialLocation;
      };
    }, [])
  );

  let waiting = "Waiting for location..";
  if (yourPin.latitude != 50.718395 && yourPin.longitude != -1.883377) {
    waiting = "";
  }

  return (
    // TODO: Container?
    <View style={{ flex: 1, marginTop: 40 }}>
      <View>
        <Text style={styles.waiting}>{waiting}</Text>
      </View>

      <View style={styles.topButton}>
        <Button
          title="Back"
          onPress={() => {
            navigation.navigate("Home");
            setYourPin({});
            setDestination({});
          }}
        />
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details);
          setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        query={{
          key: "AIzaSyBuE5BvZEN8DEEqfxMC19gpgLLUF3Lh5Yw",
          language: "en",
          components: "country:uk",
          radius: 5000,
          location: `${yourPin.latitude}, ${yourPin.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            // position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />

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
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setDestination({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>Your destination</Text>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.mapButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ActiveLocation", { yourPin, destination })
          }
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;
