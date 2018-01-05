import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { Contacts } from "expo";
import { List, Button, ListItem, Icon } from "react-native-elements";
// import Button from "./Button.js";

export default class ContactsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactSearch: null,
      contacts: null
      // selected: []
    };
  }

  async showFirstContactAsync() {
    // Ask for permission to query contacts.
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );
    if (permission.status !== "granted") {
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
  }

  saveContact = arg => {
    arg.map(item => {
      let contactChoice = item.digits;
      // console.log(`${item.digits}`);
    });
    AsyncStorage.set("contactChoice", contactChoice);
  };

  render() {
    // console.log("STATE", this.state)
    const alphContacts = this.state.contacts;
    console.log(alphContacts);
    return (
      <View style={styles.GetContactsContainer}>
        <Icon
          name="users"
          type="feather"
          color="#517fa4"
          raised={true}
          onPress={this.showFirstContactAsync.bind(this)}
          // backgroundColor="white"
          // title="Get Contacts"
          // containerViewStyle={{ borderRadius: 25 }}
          // buttonStyle={{ width: 320, height: 45, borderRadius: 25 }}
          // color="black"
          // style={styles.button}
        />
        {alphContacts ? (
          <FlatList
            data={alphContacts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.saveContact(item.phoneNumbers)}
              >
                <ListItem title={item.name} />
                {/*  <ListItem
                  title={this.name(item)}
                  onPress={() => this.selectItem(item)}
                /> */}
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
  GetContactsContainer: {
    flexDirection: "column",
    flex: 4,
    backgroundColor: "yellow",
    justifyContent: "flex-start",
    padding: 8,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 100,
    borderRadius: 10
  }
});
