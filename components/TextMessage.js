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

  ////// this may need to go into handleSubmit
  // displayData = async () => {
  //   try {
  //     this.state.contact = await AsyncStorage.getItem('contactChoice');
  //     console.log(`state: ${this.state.contact}`);
  //   } catch (error) {
  //     Alert.alert(JSON.stringify(error));
  //   }
  // };

  saveMessage = () => {
    let message = this.state.message;
    AsyncStorage.setItem('message', message);
    console.log(message);
  };

  handleSubmit = async () => {
    // try {
    //   this.state.contact = await AsyncStorage.getItem('contactChoice');
    //   console.log(`state: ${this.state.contact}`);
    // } catch (error) {
    //   Alert.alert(JSON.stringify(error));
    // }
    console.log('works');
    console.log(await AsyncStorage.getItem('contactChoice'));
    console.log(await AsyncStorage.getItem('message'));
    fetch('https://frozen-ridge-66479.herokuapp.com/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: await AsyncStorage.getItem('contactChoice'),
        message: await AsyncStorage.getItem('message')
      })
    })
      .then(response => {
        console.log(response);
      })
      .done();
  };

  render() {
    return (
      <View>
        <Button
          style={styles.button}
          title="save message"
          onPress={this.saveMessage}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.setState({ contact: text })}
          value={this.state.contact}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9a73ef"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
        <Button
          style={styles.button}
          title="Send Message"
          onPress={this.handleSubmit}
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
