import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Constants, Audio } from 'expo';
import { StackNavigator } from 'react-navigation';
import Map from './components/Map.js';
import HomeScreen from './screens/HomeScreen.js';
import EventScreen from './screens/EventScreen.js';
import ByeByeButton from './components/ByeByeButton.js';
import * as firebase from 'firebase';
import { FormLabel, FormInput } from 'react-native-elements';

export default class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDNg7Yvip2uARARUtmWgPkiGlZRaA9V06M',
      authDomain: 'nycda-b7787.firebaseapp.com',
      databaseURL: 'https://nycda-b7787.firebaseio.com',
      storageBucket: 'nycda-b7787.appspot.com'
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return <AppNavigator />;
  }
}

const AppNavigator = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  EventScreen: { screen: EventScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
