import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Image,Text } from 'react-native';
import Lottieview from "lottie-react-native";
import Colors from '../../constants/Colors';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Lottieview style={styles.lottie}
        source={require('../../assets/lottie/31548-robot-says-hello.json')}
        autoPlay
      />
      <ScrollView
       style={styles.scrollview}
       contentContainerStyle={{
         alignItems: 'center',
         margin: 15,
       }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
        />
        <Text style={styles.appname}>
          iNote
        </Text>
        <Text style={styles.version}>
          Version 1.0.7
        </Text>
        <Text style={styles.app}>
         A pleasant day, we thank you for using our app "iNote". Its main objective
         is to help people jot down details they want to save for later use. The developers
         do not recommend saving passwords and other important credentials as such, since this app
         is not yet supported for authentication functionalities and other security features, doing so
         may put you at the risk of hacking. The app was developed in a short period of time and we are sorry
         for the bugs that may occur in the future, your feedback is a great help for the developers to improve
         the app. This app was developed to be presented to Mr. Jhon Rhay Parreño a faculty of College of Computer Studies
         University of Rizal System. In partial fulfillment of the requirements for the course Application
         Development and Emerging Technologies.
        </Text>
        <View style={{height: 80}} />
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#495057',
    paddingTop: 20,
  },
  lottie: {
    width: Dimensions.get('screen').width * .7,
    height: Dimensions.get('screen').height * .25,
  },
  scrollview: {
    width: "100%",
    backgroundColor: "#212529",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  appname: {
    color: Colors.txt,
    fontWeight: 'bold',
    fontSize: 25
  },
  version: {
    color: Colors.txt,
    fontWeight: '100',
    fontSize: 16,
    opacity: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  app: {
    color: Colors.txt,
    fontWeight: '100',
    fontSize: 18,
    opacity: 0.9,
    alignSelf: 'flex-start',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: 'white'
  }
});
