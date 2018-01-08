import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert
} from 'react-native';
import { List, Button, ListItem, Icon } from 'react-native-elements';
require('json-circular-stringify');
import Map from './Map.js';

export default class TextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  saveMessage = () => {
    let message = this.state.message;
    AsyncStorage.setItem('message', message);
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
        <Icon
          name="save"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.saveMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SaveMessageContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10
  },
  MessageInput: {
    flex: 2,
    backgroundColor: '#aec3e5',
    padding: 8,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  SaveMessageButton: {
    padding: 5
  }
});
