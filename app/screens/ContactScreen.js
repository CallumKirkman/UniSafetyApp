import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { auth } from "../components/firebase";
import {
  createUser,
  addContact,
  getDocument,
  getCollection,
} from "../components/firestore";
import Colour from "../static/Colour";

const Contact = ({ navigation }) => {
  const runCreateUser = () => {
    createUser(auth.currentUser?.email, "User Name", "9999999999");
  };

  const runAddContact = () => {
    addContact(auth.currentUser?.email, "Contact Name", "9999999999");
  };

  const runGetDocument = async () => {
    await getDocument(auth.currentUser?.email).then((user) => {
      console.log("User data");
      console.log(user);
    });
  };

  const runGetCollection = async () => {
    await getCollection().then((collection) => {
      console.log("Collection data");
      console.log(collection);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Contact screen</Text>

      <View style={styles.topButtons}>
        <TouchableOpacity
          style={[styles.buttonBox]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonBox]}
          onPress={() => navigation.navigate("ContactAdd")}
        >
          <Text style={styles.buttonText}>Contact Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBox]}
          onPress={() => navigation.navigate("ContactEdit")}
        >
          <Text style={styles.buttonText}>Contact Edit</Text>
        </TouchableOpacity>
      </View>

      <Text>Email: {auth.currentUser?.email}</Text>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runAddContact}>
        <Text style={styles.buttonText}>Add contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runGetDocument}>
        <Text style={styles.buttonText}>Get document</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runGetCollection}>
        <Text style={styles.buttonText}>Get collection</Text>
      </TouchableOpacity>

      {/* TODO: Contact flatlist */}
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topButtons: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBox: {
    backgroundColor: Colour.blue,
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
});
