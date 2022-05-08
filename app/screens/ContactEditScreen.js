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
import { addContact, deleteContact } from "../components/firestore";
import styles from "../static/Styles";

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

  const runEditContact = () => {
    deleteContact(email, contactInformation.number.toString());
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
          <TouchableOpacity
            style={styles.buttonInvalid}
            disabled={disabledStatus}
          >
            <Text style={styles.buttonText}>Edit contact</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={runEditContact}>
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
