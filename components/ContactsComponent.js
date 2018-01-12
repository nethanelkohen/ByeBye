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
import { List, ListItem, Icon, SearchBar } from 'react-native-elements';

class ContactsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      contacts: null,
      contactSearch: null,
      loading: false,
      page: 1,
      seed: 1,
      error: null
      // refreshing: false
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
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });
  }

  saveContact = arg => {
    arg.map(item => {
      let contactChoice = item.digits;
      AsyncStorage.setItem('contactChoice', contactChoice);
    });
  };

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

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.showFirstContactAsync();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
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

  render() {
    const { toggle } = this.state;
    const alphContacts = this.state.contacts;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.GetContactsContainer}>
        <TouchableOpacity onPress={this.showFirstContactAsync.bind(this)}>
          <Icon name="users" type="feather" color="#517fa4" raised={true} />
          <Text>Contacts</Text>
        </TouchableOpacity>

        {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboard}> */}
        {toggle ? (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={alphContacts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.saveContact(item.phoneNumbers)}
                  onPress={() => navigate('MessageScreen')}
                >
                  <ListItem
                    roundAvatar
                    title={item.name}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              // onRefresh={this.handleRefresh}
              // refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>
        ) : null}
        {/* </KeyboardAvoidingView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'green'
  },
  GetContactsContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#95dcf4',
    justifyContent: 'flex-start',
    padding: 8,
    marginRight: 5,
    marginLeft: 5,
    // marginBottom: 100,
    borderRadius: 10
  },
  keyboard: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default ContactsComponent;
