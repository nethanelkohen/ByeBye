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
  Picker,
  FlatList
} from 'react-native';
import { Contacts } from 'expo';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
import TextMessage from '../components/TextMessage.js';
import MapScreen from './MapScreen';
import { FormLabel, FormInput } from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactSearch: null,
      contacts: null
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
      pageSize: 1000,
      pageOffset: 0
    });
    // const sortedContacts = contacts.sort((a, b) => a.name > b.name);
    // console.log(sortedContacts);
    this.setState({
      contacts: contacts
    });
  }

  render() {
    const newContacts = this.state.contacts;
    return (
      <View>
        <Button
          style={styles.button}
          title="Get Contacts"
          onPress={this.showFirstContactAsync.bind(this)}
        />
        <TextMessage />
        {newContacts ? (
          <FlatList
            data={newContacts.data}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            keyExtractor={(item, index) => index}
          />
        ) : null}
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
