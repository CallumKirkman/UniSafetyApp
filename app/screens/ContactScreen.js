import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { auth } from "../components/firebaseNew";
import { getUser, getContacts } from "../components/firestoreNew";
import styles from "../static/Styles";
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
    const backgroundColor =
      item.number === selectedId ? Colour.highlight : Colour.secondary;
    const color =
      item.number === selectedId ? Colour.primary : Colour.highlight;

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
    <View style={[styles.contactContainer]}>
      <View style={[styles.contactBuffer]}>
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
            <Text style={styles.buttonText}>Add contact</Text>
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
      </View>
    </View>
  );
};

export default Contact;
