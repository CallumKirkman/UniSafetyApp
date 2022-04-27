import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as GeoLocation from "expo-location";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Colour from "../static/Colour";

const Location = ({ navigation }) => {
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

  useEffect(() => {
    (async () => {
      //TODO: Add requestBackgroundPermissionsAsync()?
      let { status } = await GeoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await GeoLocation.getCurrentPositionAsync({});

      setYourPin({
        latitude: parseFloat(JSON.stringify(location.coords.latitude)),
        longitude: parseFloat(JSON.stringify(location.coords.longitude)),
      });
    })();
  }, []);

  let waiting = "Waiting for location..";
  if (yourPin.latitude != 50.718395 && yourPin.longitude != -1.883377) {
    waiting = "";
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={styles.paragraph}>{waiting}</Text>
      </View>

      <View style={styles.topButton}>
        <Button title="Back" onPress={() => navigation.navigate("Home")} />
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
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
          }} // Destination pin
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("ActiveLocation", { yourPin, destination })
          }
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "75%",
  },
  topButton: {
    padding: 5,
    flexDirection: "row",
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: Colour.blue,
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
  paragraph: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
  },
});
