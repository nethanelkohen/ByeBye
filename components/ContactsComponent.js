import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Expo, { Contacts } from 'expo';
import { ListItem } from 'react-native-elements';

export default class ContactsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null
    };
  }

  showFirstContactAsync = async () => {
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
    const obj = [...contacts.data];
    const newContacts = obj.sort((a, b) => {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) return -1;
      // if (nameA > nameB) return 1;
    });
    this.setState({
      contacts: newContacts
    });
  };

  componentShouldMount() {
    this.showFirstContactAsync();
  }

  saveContact = arg => {
    arg.map(item => {
      console.log(`+1${item.digits}`);
    });
  };

  render() {
    const alphContacts = this.state.contacts;
    return (
      <View>
        <Button
          style={styles.button}
          title="Get Contacts"
          onPress={this.showFirstContactAsync.bind(this)}
        />
        <FlatList
          data={alphContacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.saveContact(item.phoneNumbers)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
