import React, { useEffect } from "react";
import Alert, { LogBox } from "react-native";

import * as ExpoLocation from "expo-location";

import MainStack from "./app/navigation/MainStack";

// Ignore expo unavoidable async warning
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);

const App = () => {
  useEffect(() => {
    // adding event listeners on mount here
    //TODO: Check this loop works as intended
    const permissions = (async () => {
      console.log("Permissions check");

      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      while (status !== "granted") {
        status = await ExpoLocation.requestForegroundPermissionsAsync();
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
