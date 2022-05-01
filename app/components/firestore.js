import * as firebase from "firebase";

const db = firebase.firestore();

//TODO: allow for undefined alert return?
//TODO: Delete user?

// Create user data
//TODO: Add number if not taken
const createUser = (email, name, number) => {
  db.collection("Users")
    .doc(email)
    .set({
      name: name,
      number: Number(number),
    })
    .then(() => {
      console.log("User added!");
    });
};

// Set user location
const setLocation = (email, latitude, longitude) => {
  db.collection("Users")
    .doc(email)
    .collection("Location")
    .doc("currentLocation")
    .set({
      latitude: latitude,
      longitude: longitude,
    })
    .then(() => {
      console.log("Location set!");
    });
};

// Delete user location
const deleteLocation = (email) => {
  db.collection("Users")
    .doc(email)
    .collection("Location")
    .doc("currentLocation")
    .delete()
    .then(() => {
      console.log("Location deleted!");
    });
};

// Add user contact
const addContact = (email, contactName, number) => {
  db.collection("Users")
    .doc(email)
    .collection("Contacts")
    .doc(number)
    .set({
      name: contactName,
      number: Number(number),
    })
    .then(() => {
      console.log("Contact added!");
    });
};

// Delete user contact
const deleteContact = (email, number) => {
  db.collection("Users")
    .doc(email)
    .collection("Contacts")
    .doc(number)
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

// Get user location
const getLocation = async (email) => {
  const locationRef = await db
    .collection("Users")
    .doc(email)
    .collection("Location")
    .doc("currentLocation")
    .get();

  if (!locationRef.exists) {
    return "No such document!";
  } else {
    return locationRef.data();
  }
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

export {
  createUser,
  setLocation,
  deleteLocation,
  addContact,
  deleteContact,
  getUser,
  getLocation,
  getContacts,
};
