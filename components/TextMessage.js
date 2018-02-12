// Import react and component from react library.
import React, { Component } from 'react';
// Import react native components.
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert,
  Keyboard
} from 'react-native';
// Import icon for UI display.
import { Icon } from 'react-native-elements';
// Import texts from messages components.
import TextOne from './messages/TextOne.js';
import TextTwo from './messages/TextTwo.js';
import TextThree from './messages/TextThree.js';
import TextFour from './messages/TextFour.js';
import TextFive from './messages/TextFive.js';
// Require json-circular-stringify to overrides JSON's
// stringify to handle circular references for text message input.
require('json-circular-stringify');

// Create TextMessage component.
class TextMessage extends Component {
  // Create constructor and gain access to props and functions from parent.
  constructor(props) {
    super(props);
    // Create state (message).
    this.state = {
      message: null
    };
  }

  // saveMessage method saves user's message from TextInput to device's storage
  // then navigates to map screen and dismisses keyboard from view. Alerts user if
  // input is empty.
  saveMessage = () => {
    let message = this.state.message;
    if (!message) {
      Alert.alert('Enter a message');
    } else {
      AsyncStorage.setItem('message', message);
      this.props.navigation.navigate('MapScreen');
      Keyboard.dismiss();
    }
  };

  // oneText method sets user's text message choice to textOne using device's storage
  // then navigates to map screen and dismisses keyboard from view.
  oneText = () => {
    let textOne = `I am alive. I got home.`;
    AsyncStorage.setItem('message', textOne);
    this.props.navigation.navigate('MapScreen');
    Keyboard.dismiss();
  };

  // twoText method sets user's text message choice to textTwo using device's storage
  // then navigates to map screen and dismisses keyboard from view.
  twoText = () => {
    let textTwo = `I made it home, but I can't keep living like this. I need to make changes.`;
    AsyncStorage.setItem('message', textTwo);
    this.props.navigation.navigate('MapScreen');
    Keyboard.dismiss();
  };

  // threeText = () => {
  //   let textThree = `I'M HOME`;
  //   AsyncStorage.setItem('message', textThree);
  //   this.props.navigation.navigate('MapScreen');
  //   Keyboard.dismiss();
  // };

  // fourText method sets user's text message choice to textFour using device's storage
  // then navigates to map screen and dismisses keyboard from view.
  fourText = () => {
    let textFour = `I made it home safe and sound. In your face.`;
    AsyncStorage.setItem('message', textFour);
    this.props.navigation.navigate('MapScreen');
    Keyboard.dismiss();
  };

  // fiveText method sets user's text message choice to textFive using device's storage
  // then navigates to map screen and dismisses keyboard from view.
  fiveText = () => {
    let textFive = `To all the haters who thought I'd never make it home, who thought my alcoholism was an issue, this one's for you: I am home safe and sound.`;
    AsyncStorage.setItem('message', textFive);
    this.props.navigation.navigate('MapScreen');
    Keyboard.dismiss();
  };

  // Dismisses keyboard after user presses enter in TextInput.
  onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  // Render React elements to device.
  render() {
    // Pass in navigation props.
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.SaveMessageContainer}>
        {/* Text input from react native component used to record what user types. */}
        <TextInput
          style={styles.MessageInput}
          multiline={true}
          placeholder="Enter Your Message"
          placeholderTextColor="black"
          returnKeyType="go"
          // Sets text message (state) to whatever user types.
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
          // Tied to onKeyPress event which is used to dismiss keyboard.
          onKeyPress={this.onKeyPress}
        />
        {/* Renders icons from react-native-elements for easier UI display.
          Icons used to save user input or user text message choice. */}
        <Icon
          name="save"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          // Saves message on icon press.
          onPress={this.saveMessage}
        />
        <Text>Save Message</Text>
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          // Saves user text message to textOne on icon press.
          onPress={this.oneText}
        />
        {/* Renders TextOne component */}
        <TextOne />
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          // Saves user text message to textTwo on icon press.
          onPress={this.twoText}
        />
        {/* Renders TextTwo component */}
        <TextTwo />
        {/* <Icon
            name="arrow-right"
            type="feather"
            color="#517fa4"
            raised={true}
            backgroundColor="white"
            // Saves user text message to textThree on icon press.
            onPress={this.threeText}
          />
          <TextThree /> */}
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          // Saves user text message to textFour on icon press.
          onPress={this.fourText}
        />
        {/* Renders TextFour component */}
        <TextFour />
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          // Saves user text message to textFive on icon press.
          onPress={this.fiveText}
        />
        {/* Renders TextFive component */}
        <TextFive />
      </View>
    );
  }
}

// React Native styles.
const styles = StyleSheet.create({
  SaveMessageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    // borderRadius: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  MessageInput: {
    // flex: 1,
    height: 70,
    backgroundColor: '#95dcf4',
    padding: 8,
    fontSize: 20,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  SaveMessageButton: {
    padding: 5
  }
});

// Export TextMessage component.
export default TextMessage;
