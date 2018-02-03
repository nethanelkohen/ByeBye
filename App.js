// Import react and component from react library.
import React, { Component } from 'react';
// Import stylesheet from react-native.
import { StyleSheet } from 'react-native';
// Import constants from Expo.
import { Constants } from 'expo';
// Import stack navigator from react-navigation which sets the main
// navigator for react-native app.
import { StackNavigator } from 'react-navigation';
// Import home screen for navigation.
import HomeScreen from './screens/HomeScreen.js';
// Import map screen for navigation.
import MapScreen from './screens/MapScreen.js';
// Import onboarding screen for navigation.
import OnBoarding from './screens/OnBoarding.js';
// Import message screen for navigation.
import MessageScreen from './screens/MessageScreen.js';

// Set stack navigator as AppNavigator from react-navigation, which
// creates navigator for reach screen on app.
const AppNavigator = StackNavigator({
  // Creates OnBoarding screen.
  OnBoarding: {
    // Renders screen from OnBoarding.js.
    screen: OnBoarding,
    // navigationOptions deletes header from screen so OnBoarding
    // screen takes up the whole screen.
    navigationOptions: {
      header: null
    }
  },
  // Creates HomeScreen screen.
  HomeScreen: {
    // Renders screen from HomeScreen.js.
    screen: HomeScreen,
    // navigationOptions deletes left header from HomeScreen
    // so back button does not appear.
    navigationOptions: {
      headerLeft: null
    }
  },
  // Creates MessageScreen screen.
  MessageScreen: {
    // Renders screen from MessageScreen.js.
    screen: MessageScreen,
    // navigationOptions deletes left header from MessageScreen
    // so back button does not appear.
    navigationOptions: {
      headerLeft: null
    }
  },
  // Creates MapScreen screen.
  MapScreen: {
    // Renders screen from MapScreen.js.
    screen: MapScreen,
    // navigationOptions deletes left header from MapScreen
    // so back button does not appear.
    navigationOptions: {
      headerLeft: null
    }
  }
});

// Create App component.
class App extends Component {
  // Render React elements to device.
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
