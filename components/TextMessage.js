import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert,
  Keyboard
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
    if (!message) {
      Alert.alert('Enter a message');
    } else {
      AsyncStorage.setItem('message', message);
      console.log(message);
    }
  };

  onKeyPress = ({ nativeEvent }) => {
    console.log(nativeEvent);
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <View style={styles.SaveMessageContainer}>
        <TextInput
          style={styles.MessageInput}
          multiline={true}
          placeholder="Enter Your Message"
          placeholderTextColor="black"
          returnKeyType="go"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
          onKeyPress={this.onKeyPress}
        />
        <Icon
          name="save"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.saveMessage}
        />
        <Text>Save Message</Text>
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
    backgroundColor: '#95dcf4',
    padding: 8,
    fontSize: 20,
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'stretch'
  },
  SaveMessageButton: {
    padding: 5
  }
});
