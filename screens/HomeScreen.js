import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
import ByeByes from './ByeByes';
import { FormLabel, FormInput } from 'react-native-elements';
// import InputContact from '../components/Input.js';
import axios from 'axios';
require('json-circular-stringify');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contact: null,
        message: null
    };
  }

  handleSubmit() {
    let contact = this.state.contact;
    let message = this.state.message;
    fetch('https://frozen-ridge-66479.herokuapp.com/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'contact': contact,
        'message': message
      })
    })
      .then(response => {
        console.log(response);
      })
      .done();
  }

  mapScreenPress() {
    this.props.navigation.navigate('MapScreen');
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text> Loading </Text>;
    }
    return (
      <View>
        <Button onPress={this.mapScreenPress.bind(this)} title="Map" />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderButtonOrLoading()}
        <TextInput
          style={styles.input}
          placeholder="Contact"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.setState({ contact: text })}
          value={this.state.contact}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
        />
        <Button
          style={styles.button}
          title="Send Message"
          onPress={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    ByeByes: {
      screen: ByeByes
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
