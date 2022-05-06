import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Home from "../screens/HomeScreen";
import Location from "../screens/LocationScreen";
import ActiveLocation from "../screens/ActiveLocationScreen";
import Contact from "../screens/ContactScreen";
import ContactAdd from "../screens/ContactAddScreen";
import ContactEdit from "../screens/ContactEditScreen";
import Resources from "../screens/ResourcesScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="ActiveLocation" component={ActiveLocation} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ContactAdd" component={ContactAdd} />
        <Stack.Screen name="ContactEdit" component={ContactEdit} />
        <Stack.Screen name="Resources" component={Resources} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
