import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";

import { auth } from "../components/firebase";
import { addContact } from "../components/firestore";
import styles from "../static/Styles";

const ContactAdd = ({ navigation, route }) => {
  console.log("Contact add screen render");
  let email = auth.currentUser?.email;

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [disabledStatus, setDisabledStatus] = useState(true);

  useEffect(() => {
    if (number.length === 11 && name != "") {
      if (route.params.numberList.includes(number) === false) {
        // Contact does not exist
        setDisabledStatus(false);
      }
      // Contact already exists
    } else {
      // Contact wrong format
      setDisabledStatus(true);
    }
  });

  const runAddContact = () => {
    addContact(email, name, number);
    navigation.navigate("Contact");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.buttonBox]}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contact Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="gray"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Toggle disabled button */}
        {disabledStatus ? (
          // Invalid
          <>
            <Text style={[styles.warningText]}>
              Invalid contact name or number
            </Text>
            <TouchableOpacity style={styles.buttonInvalid} disabled={true}>
              <Text style={styles.buttonText}>Add contact</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Valid
          <TouchableOpacity style={styles.button} onPress={runAddContact}>
            <Text style={styles.buttonText}>Add contact</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactAdd;
