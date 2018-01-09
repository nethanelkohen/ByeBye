import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { Contacts } from 'expo';
import { List, Button, ListItem, Icon } from 'react-native-elements';

export default class ContactsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null
      // selected: []
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
    const obj = [...contacts.data];
    const newContacts = obj.sort((a, b) => {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) return -1;
    });
    this.setState({
      contacts: newContacts
    });
  }

  saveContact = arg => {
    arg.map(item => {
      let contactChoice = item.digits;
      AsyncStorage.setItem('contactChoice', contactChoice);
    });
  };

  render() {
    const alphContacts = this.state.contacts;
    return (
      <View style={styles.GetContactsContainer}>
        <Icon
          name="users"
          type="feather"
          color="#517fa4"
          raised={true}
          onPress={this.showFirstContactAsync.bind(this)}
        />
        {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboard}> */}
        {alphContacts ? (
          <FlatList
            data={alphContacts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.saveContact(item.phoneNumbers)}
              >
                <ListItem title={item.name} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : null}
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  GetContactsContainer: {
    flexDirection: 'column',
    flex: 4,
    backgroundColor: '#95dcf4',
    justifyContent: 'flex-start',
    padding: 8,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 100,
    borderRadius: 10
  },
  keyboard: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
