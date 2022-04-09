import * as firebase from "firebase";

const db = firebase.firestore();

// Create user data
const createUser = (email, name, number) => {
  //TODO: allow for undefined alert return
  db.collection("Users")
    .doc(email)
    .set({
      name: name,
      number: number,
    })
    .then(() => {
      console.log("User added!");
    });
};

// Add user contact
const addContact = (email, contactName, number) => {
  db.collection("Users")
    .doc(email)
    .collection("Contacts")
    .doc(contactName)
    .set({
      number: number,
    })
    .then(() => {
      console.log("Contact added!");
    });
};

// Get specific doccument
const getDocument = async (email) => {
  const userRef = await db.collection("Users").doc(email).get();

  return userRef.data();
};

// Get all in collection
const getCollection = async () => {
  let dataArray = [];

  const userRef = await db.collection("Users").get();

  userRef.forEach((doc) => {
    dataArray.push(doc.data());
    // console.log(doc.id, "=>", doc.data());
  });

  return dataArray;
};

export { createUser, addContact, getDocument, getCollection };
