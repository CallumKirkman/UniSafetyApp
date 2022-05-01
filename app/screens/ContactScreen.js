import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { auth } from "../components/firebase";
import { getUser, getContacts } from "../components/firestore";
import Colour from "../static/Colour";

const Contact = ({ navigation }) => {
  console.log("Contact screen render");
  let email = auth.currentUser?.email;

  const isFocused = useIsFocused();

  const [selectedId, setSelectedId] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [numberList, setNumberList] = useState([]);

  useEffect(() => {
    runGetContacts();
  }, [isFocused]);

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
          navigation.navigate("ContactEdit", { item, numberList });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const runGetUser = async () => {
    await getUser(email).then((user) => {
      console.log("User data");
      console.log(user);
    });
  };

  const runGetContacts = async () => {
    let numberArray = [];

    await getContacts(email).then((collection) => {
      setContacts(collection);
      collection.forEach((item) => {
        numberArray.push(item.number);
      });
      setNumberList(numberArray);
      //TODO: display warning contact exists in edit & add?
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
          onPress={() => navigation.navigate("ContactAdd", { numberList })}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.number}
        extraData={selectedId}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>No contacts found</Text>
        }
      />
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
