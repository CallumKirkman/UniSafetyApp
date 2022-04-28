import React, { useEffect } from "react";
import Alert, { LogBox } from "react-native";

import * as ExpoLocation from "expo-location";

import MainStack from "./app/navigation/MainStack";

// Ignore expo unavoidable async warning
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);

const App = () => {
  useEffect(() => {
    // adding event listeners on mount here
    const permissions = (async () => {
      console.log("Permissions check");

      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      //TODO: Make backround work?
      // let backPerm = await ExpoLocation.requestBackgroundPermissionsAsync();
      // console.log(backPerm);
    })([]);

    return () => permissions;
  }, []);

  return <MainStack />;
};

export default App;
