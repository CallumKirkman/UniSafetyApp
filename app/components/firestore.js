import * as firebase from "firebase";

const db = firebase.firestore();

//TODO: allow for undefined alert return?
//TODO: Delete user?

// Create user data
const createUser = (email, name, number) => {
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
      name: contactName,
      number: number,
    })
    .then(() => {
      console.log("Contact added!");
    });
};

// Delete user contact
const deleteContact = (email, contactName) => {
  db.collection("Users")
    .doc(email)
    .collection("Contacts")
    .doc(contactName)
    .delete()
    .then(() => {
      console.log("Contact deleted!");
    });
};

// Get user information
const getUser = async (email) => {
  const userRef = await db.collection("Users").doc(email).get();

  return userRef.data();
};

// Get all user contacts
const getContacts = async (email) => {
  let dataArray = [];

  const userRef = await db
    .collection("Users")
    .doc(email)
    .collection("Contacts")
    .get();

  userRef.forEach((doc) => {
    dataArray.push(doc.data());
    // console.log(doc.id, "=>", doc.data());
  });

  return dataArray;
};

export { createUser, addContact, deleteContact, getUser, getContacts };
