import { StyleSheet } from "react-native";
import Colour from "./Colour";

export default StyleSheet.create({
  //Shared
  container: {
    flex: 1,
    backgroundColor: Colour.background,
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
    backgroundColor: Colour.primary,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  buttonBox: {
    // Contact edit & add
    backgroundColor: Colour.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  buttonInvalid: {
    backgroundColor: Colour.mediumGray,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  buttonOutline: {
    backgroundColor: Colour.secondary,
    borderColor: Colour.highlight,
    borderWidth: 2,
  },

  buttonText: {
    color: Colour.highlight,
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
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  deleteText: {
    color: Colour.highlight,
    fontWeight: "700",
    fontSize: 16,
  },

  //Contact
  contactContainer: {
    flex: 1,
    backgroundColor: Colour.background,
  },
  contactBuffer: {
    flex: 1,
    marginTop: 25,
  },
  topButtons: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 30,
    borderColor: Colour.highlight,
    borderWidth: 2,
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
  homeContainer: {
    flex: 1,
    backgroundColor: Colour.background,
  },
  containerBuffer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  homeButtonBox: {
    backgroundColor: Colour.primary,
    width: "100%",
    height: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  buttonBarContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  squareButtonContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBar: {
    backgroundColor: Colour.primary,
    width: "100%",
    height: "50%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  signoutButton: {
    backgroundColor: Colour.secondary,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 20,
    borderColor: Colour.highlight,
    borderWidth: 2,
  },
  signoutText: {
    color: Colour.highlight,
    fontWeight: "700",
    fontSize: 16,
  },

  //Location
  waiting: {
    color: Colour.highlight,
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
  },

  //Login

  //Register
});
