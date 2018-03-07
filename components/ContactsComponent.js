// Import react and component from react library.
import React, { Component } from 'react';
// Import react native components.
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from 'react-native';
// Import contacts components from Expo.
import { Contacts } from 'expo';
// Import UI components from react-native-elements.
import { List, ListItem, Icon, SearchBar } from 'react-native-elements';

// Create Contacts component.
class ContactsComponent extends React.PureComponent {
  // Create constructor and gain access to props and functions from parent.
  constructor(props) {
    super(props);
    // Create state.
    this.state = {
      contacts: null,
      contactSearch: null,
      loading: false
      // page: 1,
      // seed: 1,
      // refreshing: false,
      // selected: []
    };
  }

  // Run showFirstContactAsync when app loads.
  componentDidMount() {
    this.showFirstContactAsync();
  }

  // Async func that aks user permission to query contacts.
  showFirstContactAsync = async () => {
    // Gain permission.
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );
    // If permssion was denied, alert user.
    if (permission.status !== 'granted') {
      Alert.alert('Access denied.');
    }
    // Store contacts with phone number field and page size of 1000 contacts.
    const contacts = await Expo.Contacts.getContactsAsync({
      fields: [Expo.Contacts.PHONE_NUMBERS],
      pageSize: 1000,
      pageOffset: 0
    });
    // Gain access to contacts.data array.
    const obj = [...contacts.data];
    // Sort through contacts to alphabetize user's contacts.
    const newContacts = obj.sort((a, b) => {
      let nameA = a.name;
      let nameB = b.name;
      if (nameA < nameB) return -1;
    });
    // Set state with alphabetized contacts array.
    this.setState({
      contacts: newContacts
    });
  };

  // Refresh handler for contacts list -- not being used since FlatList has built
  // refreshing capability.
  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //       seed: this.state.seed + 1,
  //       refreshing: true
  //     },
  //     () => {
  //       this.showFirstContactAsync();
  //     }
  //   );
  // };

  // Loading handler for contacts list -- not being used since FlatList has built
  // loading capability.
  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.showFirstContactAsync();
  //     }
  //   );
  // };

  // Creates a border for each contact in list.
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE'
          // marginLeft: '14%'
        }}
      />
    );
  };

  // Creates a header for contact list.
  renderHeader = () => {
    return (
      //Renders search bar component from react-native-elements.
      <SearchBar
        placeholder="Search"
        lightTheme
        round
        returnKeyType="go"
        // ref="search"
        textInputRef="searchText"
        //Searches contacts when new letter is typed in search bar.
        onChangeText={this.handleSearch.bind(this)}
      />
    );
  };

  // Creates a footer for contact list.
  renderFooter = () => {
    // Do not render footer if contact list is still loading.
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  // Takes in phone number digits from user's contact choice from list and sets
  // it to async storage as contactChoice for user's text message.
  saveContact = arg => {
    arg.map(item => {
      let contactChoice = item.digits;
      AsyncStorage.setItem('contactChoice', contactChoice);
    });
    // Navigates to message screen after choice is stored.
    this.props.navigation.navigate('MessageScreen');
  };

  // Searches through contact list, takes in user's search and stores it to state
  // for contact list search.
  handleSearch = text => {
    this.setState({ contactSearch: text });
  };

  render() {
    // Cache contacts and contactSearch state for readability.
    const alphContacts = this.state.contacts;
    const contactSearch = this.state.contactSearch;

    return (
      <View style={styles.getContactsContainer}>
        {/* <TouchableOpacity onPress={this.showFirstContactAsync.bind(this)}>
          <Icon name="users" type="feather" color="#517fa4" raised={true} />
          <Text>Contacts</Text>
        </TouchableOpacity> */}
        {/* <Icon
          name="users"
          type="feather"
          color="#517fa4"
          raised={true}
          onPress={() => console.log(AsyncStorage.getItem('contactChoice'))}
        /> */}
        {/* Conditional statement: if contacts state exists, then create list with
          contactSearch state as data. */}
        {alphContacts ? (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={
                // If contactSearch state is empty then render contact state as
                // normal.
                !contactSearch
                  ? alphContacts
                  : // Otherwise, take in what user typed and filter through by first name.
                    alphContacts.filter(item =>
                      item.firstName.includes(this.state.contactSearch)
                    )
              }
              // Render items for FlatList.
              renderItem={({ item }) => (
                // Saves contact with phone number digits as arg.
                <TouchableOpacity
                  onPress={() => this.saveContact(item.phoneNumbers)}
                >
                  {/* Renders contact's full name as item in FlatList. */}
                  <ListItem
                    title={item.name}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              // Renders index for FlatList and calls header and seperator funcs.
              keyExtractor={(item, index) => index}
              ListHeaderComponent={this.renderHeader}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </List>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  getContactsContainer: {
    flexDirection: 'column',
    flex: 1
    // backgroundColor: '#95dcf4',
    // justifyContent: 'flex-start',
    // padding: 8,
    // marginRight: 5,
    // marginLeft: 5,
    // marginBottom: 100,
    // borderRadius: 10
  },
  keyboard: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default ContactsComponent;
