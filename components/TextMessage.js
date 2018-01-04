import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  AsyncStorage,
  Alert
} from 'react-native';
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
      <View>
        <Button
          style={styles.button}
          title="Save Message"
          onPress={this.saveMessage}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9a73ef"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
