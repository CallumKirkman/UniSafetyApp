import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
} from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker } from "react-native-maps";

const Location = ({ navigation }) => {
  const [pin, setPin] = React.useState({
    latitude: 50.718395,
    longitude: -1.883377,
  });

  const [region, setRegion] = React.useState({
    latitude: 50.718395,
    longitude: -1.883377,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          setRegion({
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
          location: `${region.latitude}, ${region.longitude}`,
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
          latitude: 50.718395,
          longitude: -1.883377,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>Your destination</Text>
          </Callout>
        </Marker>
        <Marker
          coordinate={pin}
          pinColor="black"
          // TODO: Set location
        >
          <Callout>
            <Text>You</Text>
          </Callout>
        </Marker>
      </MapView>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  topButton: {
    padding: 5,
    flexDirection: "row",
  },
});
