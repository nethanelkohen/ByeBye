import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ByeByes extends Component {
  render() {
    return (
      <View>
        <Text> List of user's Pending ByeByes.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
