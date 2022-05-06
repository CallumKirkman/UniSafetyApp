import React from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import * as Linking from "expo-linking";

import styles from "../static/Styles";

const Resources = ({ navigation }) => {
  const StrutSafeAlert = () =>
    Alert.alert("Strut safe", "Friday-Sunday 19:00-03:00", [
      {
        text: "Call",
        onPress: () => Linking.openURL("tel://03333350026"),
      },
      {
        text: "Website",
        onPress: () => Linking.openURL("https://www.strutsafe.org/"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive",
      },
    ]);

  return (
    <View style={[styles.homeContainer]}>
      <View style={[styles.resourcesBuffer]}>
        <View style={styles.topButton}>
          <TouchableOpacity
            style={[styles.backButton]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() =>
              Linking.openURL(
                "https://www.police.uk/pu/contact-the-police/what-and-how-to-report/how-to-report/"
              )
            }
          >
            <Text style={styles.buttonText}>How to make a police report</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() =>
              Linking.openURL(
                "https://www.bournemouth.ac.uk/students/help-advice/safety-personal-security"
              )
            }
          >
            <Text style={styles.buttonText}>Security on campus</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() =>
              Linking.openURL(
                "https://www.bournemouth.ac.uk/students/help-advice/safety-personal-security/sexual-assault-harassment"
              )
            }
          >
            <Text style={styles.buttonText}>Assault and Harassment</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity
            style={[styles.buttonBar]}
            onPress={() =>
              Linking.openURL(
                "https://www.bournemouth.ac.uk/why-bu/student-life/arrivals/student-support"
              )
            }
          >
            <Text style={styles.buttonText}>University Support</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonBarContainer]}>
          <TouchableOpacity style={[styles.buttonBar]} onPress={StrutSafeAlert}>
            <Text style={styles.buttonText}>
              Strut Safe (free phone companion)
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={[styles.rowContainer]}>
          <View style={[styles.squareButtonContainer]}>
            <TouchableOpacity style={[styles.homeButtonBox]} onPress={sendSMS}>
              <Text style={styles.buttonText}>Alert contacts</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.squareButtonContainer]}>
            <TouchableOpacity
              style={[styles.homeButtonBox]}
              onPress={callNumber}
            >
              <Text style={styles.buttonText}>Emergency Services</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default Resources;
