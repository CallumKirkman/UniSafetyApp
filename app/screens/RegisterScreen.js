import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";

import { auth } from "../components/firebase";
import { createUser } from "../components/firestore";
import Colour from "../static/Colour";

const Register = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [disabledStatus, setDisabledStatus] = useState(true);

  useEffect(() => {
    if (number.length === 10 && name != "") {
      //TODO: If number not in use?
      setDisabledStatus(false);
    } else {
      setDisabledStatus(true);
    }
  });

  const runCreateUser = () => {
    //Add details
    createUser(email, name, number);

    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Toggle disabled button */}
        {disabledStatus ? (
          <TouchableOpacity
            style={styles.buttonInvalid}
            disabled={disabledStatus}
          >
            <Text style={styles.buttonText}>Create user</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonValid} onPress={runCreateUser}>
            <Text style={styles.buttonText}>Create user</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
  buttonValid: {
    backgroundColor: Colour.blue,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonInvalid: {
    backgroundColor: Colour.mediumGray,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
});
