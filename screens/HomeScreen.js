import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import TextMessage from '../components/TextMessage.js';
import ContactsComponent from '../components/ContactsComponent.js';
import MapScreen from './MapScreen';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <ContactsComponent />
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
    MapScreen: {
      screen: MapScreen
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
