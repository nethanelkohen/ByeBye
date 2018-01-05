import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ByeByeButton from "../components/ByeByeButton.js";
import Map from "../components/Map.js";

export default class EventScreen extends Component {
  render() {
    return (
      <View style={styles.EventScreenContainer}>
        <Map style={styles.map} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EventScreenContainer: {
    flex: 1
  },
  map: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
