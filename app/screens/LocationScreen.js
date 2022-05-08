import React, { useState, useCallback } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import * as ExpoLocation from "expo-location";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { auth } from "../components/firebase";
import { getLocation, setLocation } from "../components/firestore";
import Colour from "../static/Colour";
import styles from "../static/Styles";

const Location = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const [yourPin, setYourPin] = React.useState({});
  const [destination, setDestination] = React.useState({});

  // const runGetLocation = async () => {
  //   await getLocation(email).then((location) => {
  //     if (location != "No such document!") {
  //       setYourPin({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //       });

  //       setDestination({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //       });
  //     }
  //   });
  // };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount
      // console.log("Screen focused");

      // Get last known location
      // runGetLocation();

      // Get location
      const initialLocation = (async () => {
        console.log("Initial location");

        let location = await ExpoLocation.getCurrentPositionAsync({});

        let latitude = parseFloat(JSON.stringify(location.coords.latitude));
        let longitude = parseFloat(JSON.stringify(location.coords.longitude));

        setYourPin({
          latitude: latitude,
          longitude: longitude,
        });

        setDestination({
          latitude: latitude,
          longitude: longitude,
        });

        // Save location to database
        setLocation(email, latitude, longitude);
      })();

      return () => {
        // Do something when the screen is unfocused/unmount. Useful for cleanup functions
        // console.log("Screen unfocused");

        initialLocation;
      };
    }, [])
  );

  return (
    // TODO: Container?
    <View
      style={{
        flex: 1,
        backgroundColor: Colour.background,
      }}
    >
      <View style={{ flex: 1, marginTop: 40 }}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={[styles.backButton]}
            onPress={() => {
              navigation.navigate("Home");
              setYourPin({});
              setDestination({});
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {Object.keys(yourPin).length === 0 ||
        Object.keys(destination).length === 0 ? (
          // Pins not set
          <Text style={styles.waiting}>Getting location</Text>
        ) : (
          // Pins set
          <>
            <GooglePlacesAutocomplete
              placeholder="Search destination"
              textInputProps={{ placeholderTextColor: "gray" }}
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
                  latitudeDelta: 0.07,
                  longitudeDelta: 0.03,
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
                latitudeDelta: 0.07,
                longitudeDelta: 0.03,
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
                  navigation.navigate("ActiveLocation", {
                    yourPin,
                    destination,
                  })
                }
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Location;
