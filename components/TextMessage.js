import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import TextOne from './messages/TextOne.js';
import TextTwo from './messages/TextTwo.js';
import TextThree from './messages/TextThree.js';
import TextFour from './messages/TextFour.js';
import TextFive from './messages/TextFive.js';
require('json-circular-stringify');

class TextMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

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

  oneText = () => {
    let textOne = `I am alive. I got home.`;
    AsyncStorage.setItem('message', textOne);
    this.props.navigation.navigate('MapScreen');
  };

  twoText = () => {
    let textTwo = `I made it home, but I can't keep living like this. I need to make changes.`;
    AsyncStorage.setItem('message', textTwo);
    this.props.navigation.navigate('MapScreen');
  };

  threeText = () => {
    let textThree = `I'M HOME`;
    AsyncStorage.setItem('message', textThree);
    this.props.navigation.navigate('MapScreen');
  };

  fourText = () => {
    let textFour = `I made it home safe and sound. In your face.`;
    AsyncStorage.setItem('message', textFour);
    this.props.navigation.navigate('MapScreen');
  };

  fiveText = () => {
    let textFive = `To all the haters who thought I'd never make it home, who thought my alcoholism was an issue, this one's for you: I am home safe and sound.`;
    AsyncStorage.setItem('message', textFive);
    this.props.navigation.navigate('MapScreen');
  };

  onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.SaveMessageContainer}>
        <TextInput
          style={styles.MessageInput}
          multiline={true}
          placeholder="Enter Your Message"
          placeholderTextColor="black"
          returnKeyType="go"
          onChangeText={text => this.setState({ message: text })}
          value={this.state.message}
          onKeyPress={this.onKeyPress}
        />
        <Icon
          name="save"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.saveMessage}
        />
        <Text>Save Message</Text>
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.oneText}
        />
        <TextOne />
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.twoText}
        />
        <TextTwo />
        {/* <Icon
            name="arrow-right"
            type="feather"
            color="#517fa4"
            raised={true}
            backgroundColor="white"
            onPress={this.threeText}
          />
          <TextThree /> */}
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.fourText}
        />
        <TextFour />
        <Icon
          name="arrow-right"
          type="feather"
          color="#517fa4"
          raised={true}
          backgroundColor="white"
          onPress={this.fiveText}
        />
        <TextFive />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SaveMessageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    // marginBottom: 30,
    backgroundColor: 'white',
    // borderRadius: 10,
    fontSize: 15
  },
  MessageInput: {
    // flex: 1,
    height: 70,
    backgroundColor: '#95dcf4',
    padding: 8,
    fontSize: 20,
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'stretch'
  },
  SaveMessageButton: {
    padding: 5
  }
});

export default TextMessage;
