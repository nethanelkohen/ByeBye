import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js';
import MapScreen from './screens/MapScreen.js';
import OnBoarding from './screens/OnBoarding.js';
import MessageScreen from './screens/MessageScreen.js';

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

const AppNavigator = StackNavigator({
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      header: null
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  MessageScreen: {
    screen: MessageScreen,
    navigationOptions: {
      headerLeft: null
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      headerLeft: null
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
