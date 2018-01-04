import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";
import TextMessage from "../components/TextMessage.js";
import ContactsComponent from "../components/ContactsComponent.js";
import MapScreen from "./MapScreen";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.HomeScreenContainer}>
        <TextMessage />
        <ContactsComponent />
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    MapScreen: {
      screen: MapScreen
    }
  },
  {
    animationEnabled: true
  }
);

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: "#42c5f4"
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default HomeScreenTabNavigator;
