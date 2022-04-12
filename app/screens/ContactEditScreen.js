import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { auth } from "../components/firebase";
import { addContact, deleteContact } from "../components/firestore";
import Colour from "../static/Colour";

const ContactEdit = ({ navigation, route }) => {
  console.log("Contact edit screen render");
  let email = auth.currentUser?.email;

  const contactInformation = route.params.item;

  const [name, setName] = useState(contactInformation.name);
  const [number, setNumber] = useState(contactInformation.number.toString());

  const [disabledStatus, setDisabledStatus] = useState(true);

  useEffect(() => {
    const num = contactInformation.number;
    const index = route.params.numberList.indexOf(num);

    if (index > -1) {
      route.params.numberList.splice(index, 1); // 2nd parameter means remove one item only
    }

    if (number.length === 10 && name != "") {
      if (route.params.numberList.includes(Number(number)) === false) {
        // Contact does not exist
        setDisabledStatus(false);
      }
      // Contact already exists
    } else {
      // Contact wrong format
      setDisabledStatus(true);
    }
  });

  const runEditContact = () => {
    deleteContact(email, contactInformation.number.toString());
    addContact(email, name, number);
    navigation.navigate("Contact");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={[styles.buttonBox]}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <Text>ContactEdit screen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contact Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
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
            <Text style={styles.buttonText}>Edit contact</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonValid} onPress={runEditContact}>
            <Text style={styles.buttonText}>Edit contact</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.deleteButton]}
          onPress={() => {
            deleteContact(email, contactInformation.number.toString());
            navigation.navigate("Contact");
          }}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colour.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    backgroundColor: Colour.blue,
    width: "60%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: Colour.white,
    fontWeight: "700",
    fontSize: 16,
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
  deleteButton: {
    backgroundColor: Colour.red,
    width: "60%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  deleteText: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
