import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { List, Button, ListItem, Icon } from 'react-native-elements';
import TextMessage from '../components/TextMessage.js';
import ContactsComponent from '../components/ContactsComponent.js';
import MapScreen from './MapScreen';
import OnBoarding from './OnBoarding';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.HomeScreenContainer}>
        <TextMessage />
        <ContactsComponent />
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'home'}
            type={'feather'}
            size={30}
            color="#517fa4"
            style={{ color: tintColor }}
          />
        )
      }
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'map'}
            type={'feather'}
            size={30}
            color="#517fa4"
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    animationEnabled: true
  }
);

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default HomeScreenTabNavigator;
