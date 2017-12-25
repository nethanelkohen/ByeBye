import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button,
  Dimensions
} from 'react-native';
import {} from 'expo';
import axios from 'axios';

export default class InputContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
      message: ''
    };
  }

  handleContactChange = e => {
    console.log(e);
    this.setState({ contact: e });
  };

  handleMessageChange = i => {
    console.log(i);
    this.setState({ message: i });
  };

  handleSubmit = data => {
    axios
      .post('https://frozen-ridge-66479.herokuapp.com/message', {
        contentType: 'application/json',
        data: JSON.stringify({ data })
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleContactChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleMessageChange}
        />
        <Button style={styles.button} title="go" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  button: {
    flex: 1,
    backgroundColor: 'blue'
  }
});
