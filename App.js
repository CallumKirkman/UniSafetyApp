import React from "react";
import { LogBox } from "react-native";

import MainStack from "./app/navigation/MainStack";

// Ignore expo unavoidable async warning
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"]);

const App = () => {
  return <MainStack />;
};

export default App;
