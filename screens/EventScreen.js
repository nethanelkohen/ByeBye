import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ByeByeButton from "../components/ByeByeButton.js";

export default class EventScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World! You are on the Events Screen</Text>
        <ByeByeButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
