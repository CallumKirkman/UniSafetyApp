import React, { useState, useEffect } from "react";
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
  deleteContact,
  getUser,
  getContacts,
} from "../components/firestore";
import Colour from "../static/Colour";

const Contact = ({ navigation }) => {
  let email = auth.currentUser?.email;

  const [selectedId, setSelectedId] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    runGetContacts();
  });

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.number === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.number === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.number);
          navigation.navigate("ContactEdit");
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const runCreateUser = () => {
    createUser(email, "Users_Name", "9999999999");
  };

  const runAddContact = () => {
    addContact(email, "Contact Name6", "9999999999");
  };

  const runDeleteContact = () => {
    deleteContact(email, "Contact Name");
  };

  const runGetUser = async () => {
    await getUser(email).then((user) => {
      console.log("User data");
      console.log(user);
    });
  };

  const runGetContacts = async () => {
    await getContacts(email).then((collection) => {
      // console.log("Collection data");
      // console.log(collection);

      setContacts(collection);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Text style={{ alignSelf: "center" }}>Contact screen</Text>

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
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ alignSelf: "center" }}>Email: {email}</Text>

      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
        extraData={selectedId}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>No contacts found</Text>
        }
      />

      {/* <TouchableOpacity style={[styles.buttonBox]} onPress={runCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runAddContact}>
        <Text style={styles.buttonText}>Add contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runDeleteContact}>
        <Text style={styles.buttonText}>Delete contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runGetDocument}>
        <Text style={styles.buttonText}>Get document</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBox]} onPress={runGetCollection}>
        <Text style={styles.buttonText}>Get collection</Text>
      </TouchableOpacity> */}
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
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 32,
  },
  listEmpty: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 70,
  },
});
