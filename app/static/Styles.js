import { StyleSheet } from "react-native";
import Colour from "./Colour";

export default StyleSheet.create({
  //Shared
  container: {
    flex: 1,
    backgroundColor: Colour.lightGray,
    alignItems: "center",
    justifyContent: "center",
  }, // TODO: MarginTop? Does single value work?

  map: {
    width: "100%",
    height: "75%",
  },
  mapButtonContainer: {
    margin: 10,
  },
  mapButton: {
    backgroundColor: Colour.red,
    width: "50%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
  },

  topButton: {
    padding: 5,
    flexDirection: "row",
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
  buttonBox: {
    // Contact edit & add
    backgroundColor: Colour.blue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  buttonInvalid: {
    backgroundColor: Colour.mediumGray,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonOutline: {
    backgroundColor: Colour.white,
    borderColor: Colour.blue,
    borderWidth: 2,
  },

  buttonText: {
    color: Colour.white,
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
  },
  buttonOutlineText: {
    color: Colour.blue,
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "center",
  },

  inputContainer: { width: "80%" },
  input: {
    backgroundColor: Colour.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },

  //Active location
  // map: {
  //   width: "100%",
  //   height: "90%",
  // }, // Needed after add buttons for call & text?

  //Contact add

  //Contact edit
  deleteButton: {
    backgroundColor: Colour.red,
    width: "60%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  deleteText: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 16,
  },

  //Contact
  topButtons: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
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

  //Home
  homeButtonBox: {
    backgroundColor: Colour.red,
    width: "100%",
    height: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    backgroundColor: Colour.blue,
    width: "100%",
    height: "50%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signoutButton: {
    backgroundColor: Colour.red,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
  },
  signoutText: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 16,
  },

  //Location
  waiting: {
    color: Colour.black,
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
  },

  //Login

  //Register
});
