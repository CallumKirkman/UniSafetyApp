import React, { useState } from "react";
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

const DATA = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "Fourth Item",
  },
  {
    id: "5",
    title: "Fifth Item",
  },
  {
    id: "6",
    title: "Sixth Item",
  },
  {
    id: "7",
    title: "Seventh Item",
  },
];

const Contact = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    const editNav = () => {
      setSelectedId(item.id);
      navigation.navigate("ContactEdit");
    };

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
        onPress={editNav}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

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

      <Text style={{ alignSelf: "center" }}>
        Email: {auth.currentUser?.email}
      </Text>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />

      {/* <TouchableOpacity style={[styles.buttonBox]} onPress={runCreateUser}>
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
});
