import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { auth } from "../components/firebase";
import Colour from "../static/Colour";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signUp = () => {
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
        });
    } catch (e) {
      alert("Failed to sign up");
    }
  };

  const logIn = () => {
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
        });
    } catch (e) {
      alert("Failed to log in");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]} onPress={logIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={signUp}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colour.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: Colour.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },
  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colour.blue,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonOutline: {
    backgroundColor: Colour.white,
    borderColor: Colour.blue,
    borderWidth: 2,
  },
  buttonText: { color: Colour.white, fontWeight: "700", fontSize: 16 },
  buttonOutlineText: { color: Colour.blue, fontWeight: "700", fontSize: 16 },
});
