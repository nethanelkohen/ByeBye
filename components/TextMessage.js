import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  AsyncStorage,
  Alert
} from "react-native";
require("json-circular-stringify");
import Map from "./Map.js";

export default class TextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  saveMessage = () => {
    let message = this.state.message;
    AsyncStorage.setItem("message", message);
    console.log(message);
  };

  render() {
    return (
      <View style={styles.SaveMessageContainer}>
        <TextInput
          style={styles.MessageInput}
          placeholder="Enter Your Message"
          placeholderTextColor="#9a73ef"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
        <Button
          style={styles.SaveMessageButton}
          title="Save Message"
          onPress={this.saveMessage}
        />
        {/*  // <Text style={styles.SaveMessageButtonText}>Save Message</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SaveMessageContainer: {
    // flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "red",
    padding: 8,
    borderRadius: 10
  },
  MessageInput: {
    flex: 2,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    alignSelf: "stretch"
  },
  SaveMessageButton: {
    // flexDirection: "row",
    flex: 1,
    // backgroundColor: "green",
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "flex-end"
  }
});
