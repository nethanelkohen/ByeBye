import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert
} from "react-native";
import { List, Button, ListItem, Icon } from "react-native-elements";
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
          placeholderTextColor="black"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
        <Button
          containerViewStyle={{ borderRadius: 25 }}
          buttonStyle={{ width: 100, height: 45, borderRadius: 10 }}
          backgroundColor="white"
          style={styles.SaveMessageButton}
          color="black"
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
    alignItems: "center",
    // backgroundColor: "red",
    padding: 8,
    borderRadius: 10
  },
  MessageInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    alignSelf: "stretch"
  },
  SaveMessageButton: {
    padding: 5
  }
});
