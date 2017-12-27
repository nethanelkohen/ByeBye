import Expo from 'expo';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView,
  TextInput,
  Picker
} from 'react-native';
import { Contacts } from 'expo';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
import TextMessage from '../components/TextMessage.js';
import ByeByes from './ByeByes';
import { FormLabel, FormInput } from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      fields: [Expo.Contacts.PHONE_NUMBERS],
      pageSize: 100,
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
        <TextMessage />
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
