import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Constants, Audio } from "expo";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen.js";
import EventScreen from "./screens/EventScreen.js";
import ByeByeButton from "./components/ByeByeButton.js";

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const AppNavigator = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  EventScreen: { screen: EventScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "stretch",
    justifyContent: "center"
  }
});
