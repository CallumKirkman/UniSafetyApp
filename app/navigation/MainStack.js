import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/LoginScreen";
import Home from "../screens/HomeScreen";
import Location from "../screens/LocationScreen";
import Contact from "../screens/ContactScreen";
import ContactAdd from "../screens/ContactAddScreen";
import ContactEdit from "../screens/ContactEditScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ContactAdd" component={ContactAdd} />
        <Stack.Screen name="ContactEdit" component={ContactEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
