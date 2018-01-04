import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { Contacts } from "expo";
import { List, ListItem } from "react-native-elements";

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

  //stores the index of selected items in state.selected
  // selectItem(item) {
  //   let contact = this.state.contacts.findIndex(i => item.id == i.id);
  //   let newArr = [...this.state.contacts];
  //   console.log(">>>>", newArr.length, contact)
  //   newArr[contact]["selected"] = true;
  //   AsyncStorage.set("contact", contact);
  //   this.setState({
  //     contacts: newArr
  //   });
  // }

  // nameCheck(item) {
  //   if (item.selected) {
  //     return item.name + " ✔️";
  //   } else {
  //     return item.name;
  //   }
  // }

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
        <Button
          style={styles.GetContactsButton}
          title="Get Contacts"
          color="black"
          onPress={this.showFirstContactAsync.bind(this)}
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
    flex: 3,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    marginBottom: 100,
    borderRadius: 10
  }
  // GetContactsButton: {
  //   flexDirection: "row",
  //   backgroundColor: "green",
  //   padding: 8,
  //   borderRadius: 10,
  //   fontSize: 50
  // }
});
