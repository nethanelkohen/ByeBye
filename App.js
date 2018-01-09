import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';
import Map from './components/Map.js';
import HomeScreen from './screens/HomeScreen.js';
import MapScreen from './screens/MapScreen.js';
import { FormLabel, FormInput } from 'react-native-elements';

export default class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

const AppNavigator = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  MapScreen: { screen: MapScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
