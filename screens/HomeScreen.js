import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import { Icon, Text } from 'react-native-elements';
import Emoji from '@ardentlabs/react-native-emoji';
import TextMessage from '../components/TextMessage.js';
import ContactsComponent from '../components/ContactsComponent.js';
import MessageScreen from './MessageScreen';
import MapScreen from './MapScreen';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.HomeScreenContainer}>
        <ContactsComponent navigation={this.props.navigation} />
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: (
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
        tabBarLabel: 'Contacts',
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
    MessageScreen: {
      screen: MessageScreen,
      navigationOptions: {
        title: (
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
        tabBarLabel: 'Message',
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
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        title: (
          <Text style={{ fontFamily: 'Courier-Bold' }}>
            Daddy's <Emoji name=":man:" /> Watching
          </Text>
        ),
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
