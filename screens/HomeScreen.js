// Import react and component from react library.
import React, { Component } from 'react';
// Import react native components.
import { View, StyleSheet, Text } from 'react-native';
// Import TabNavigator for tab navigation.
import { TabNavigator } from 'react-navigation';
// Import StackNavigator.
import { StackNavigator } from 'react-navigation';
// Import Icon for UI display.
import { Icon } from 'react-native-elements';
// Import Emoji for header.
import Emoji from '@ardentlabs/react-native-emoji';
// Import TextMessage for navigation purposes.
import TextMessage from '../components/TextMessage.js';
// Import ContactsComponent for navigation purposes.
import ContactsComponent from '../components/ContactsComponent.js';
// Import MessageScreen for navigation purposes.
import MessageScreen from './MessageScreen';
// Import MapScreen for navigation purposes.
import MapScreen from './MapScreen';

// Create HomeScreen component.
class HomeScreen extends Component {
  // Render React elements to device.
  render() {
    return (
      <View style={styles.HomeScreenContainer}>
        {/* Render ContactsComponent which handles user's contact functionality
           with navigation props for OnClick. */}
        <ContactsComponent navigation={this.props.navigation} />
      </View>
    );
  }
}

// Set TabNavigator, which creates three tabs at the bottom of the device to
// handle navigation.
const HomeScreenTabNavigator = TabNavigator(
  {
    // Create HomeScreen tab navigation.
    HomeScreen: {
      // Sets HomeScreen to HomeScreen Component.
      screen: HomeScreen,
      navigationOptions: {
        // Set header title.
        title: (
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
        // Sets tab label as Contacts.
        tabBarLabel: 'Contacts',
        // Sets tab display.
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'phone'}
            type={'feather'}
            size={30}
            color="#517fa4"
            style={{ color: tintColor }}
          />
        )
      }
    },
    // Create MessageScreen tab navigation.
    MessageScreen: {
      // Sets MessageScreen to MessageScreen.js.
      screen: MessageScreen,
      navigationOptions: {
        // Set header title.
        title: (
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
        // Sets tab label as Message.
        tabBarLabel: 'Message',
        // Sets tab display.
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'message-square'}
            type={'feather'}
            size={30}
            color="#517fa4"
            style={{ color: tintColor }}
          />
        )
      }
    },
    // Create MapScreen tab navigation.
    MapScreen: {
      // Sets MapScreen to MapScreen.js.
      screen: MapScreen,
      navigationOptions: {
        title: (
          // Set header title.
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
        // Sets tab label as Map.
        tabBarLabel: 'Map',
        // Sets tab display.
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
  // Smoother animation/transition between screens.
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
