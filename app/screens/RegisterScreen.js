import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";

import { auth } from "../components/firebase";
import { createUser } from "../components/firestore";
import styles from "../static/Styles";

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
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          placeholderTextColor="gray"
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
          <TouchableOpacity style={styles.button} onPress={runCreateUser}>
            <Text style={styles.buttonText}>Create user</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
