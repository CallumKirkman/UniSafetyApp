import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { auth } from "../components/firebase";
import { addContact } from "../components/firestore";
import Colour from "../static/Colour";

const ContactAdd = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const runAddContact = () => {
    // console.log(name);
    // console.log(number);
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

      <Text>ContactAdd screen</Text>

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
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]} onPress={runAddContact}>
          <Text style={styles.buttonText}>Add contact</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContactAdd;

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
  button: {
    backgroundColor: Colour.blue,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
});
