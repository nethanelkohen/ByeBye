import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { Contacts } from 'expo';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
import ByeByes from './ByeByes';
import { FormLabel, FormInput } from 'react-native-elements';
// import InputContact from '../components/Input.js';
import axios from 'axios';
require('json-circular-stringify');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      message: null,
      contactSearch: null
    };
  }

  async showFirstContactAsync() {
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS],
      pageSize: 10,
      pageOffset: 0
    });
    if (contacts.total > 0) {
      Alert.alert(
        'Your first contact is...',
        `Name: ${contacts.data[0].name}\n` +
          `Phone numbers: ${JSON.stringify(contacts.data[0].phoneNumbers)}\n` +
          `Emails: ${JSON.stringify(contacts.data[0].emails)}`
      );
    }
  }

  handleSubmit() {
    let contact = this.state.contact;
    let message = this.state.message;
    fetch('https://frozen-ridge-66479.herokuapp.com/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: contact,
        message: message
      })
    })
      .then(response => {
        console.log(response);
      })
      .done();
  }

  mapScreenPress() {
    this.props.navigation.navigate('MapScreen');
  }

  render() {
    return (
      <View>
        <Button onPress={this.mapScreenPress.bind(this)} title="Map" />
        <Button
          style={styles.button}
          title="Get Contacts"
          onPress={this.showFirstContactAsync.bind(this)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.setState({ contact: text })}
          value={this.state.contact}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
        <Button
          style={styles.button}
          title="Send Message"
          onPress={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    ByeByes: {
      screen: ByeByes
    }
  },
  {
    animationEnabled: true
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default HomeScreenTabNavigator;
