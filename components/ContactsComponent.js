import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import { Contacts } from 'expo';
import { List, ListItem } from 'react-native-elements';

export default class ContactsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contact: null,
      contactChoice: null
      // selected: []
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
      contact: newContacts
    });
  };

  //stores the index of selected items in state.selected
  // selectItem(item) {
  //   let contact = this.state.contacts.findIndex(i => item.id == i.id);
  //   let newArr = [...this.state.contacts];
  //    console.log(">>>>", newArr.length, contact)
  //   newArr[contact]['selected'] = true;
  //   this.setState({
  //     contacts: newArr
  //   });
  // }
  //
  // nameCheck(item) {
  //   if (item.selected) {
  //     return item.name + ' ✔️';
  //   } else {
  //     return item.name;
  //   }
  // }

  saveContact = arg => {
    arg.map(item => {
      let contactChoice = item.digits;
      AsyncStorage.setItem('contactChoice', contactChoice);
      console.log(contactChoice);
    });
  };

  displayData = async () => {
    try {
      let choice = await AsyncStorage.getItem('contactChoice');
      console.log(choice);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  render() {
    const alphContacts = this.state.contact;
    return (
      <View>
        {/* <Button
          style={styles.button}
          title="Display contact"
          onPress={this.displayData}
        /> */}
        <Button
          style={styles.button}
          title="Get Contacts"
          onPress={this.showFirstContactAsync.bind(this)}
        />
        {alphContacts ? (
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
        ) : null}
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
