import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { Icon } from 'react-native-elements';
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

  onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Enter') {
      Keyboard.dismiss();
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
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
            // onPress={() => navigate('MapScreen')}
          />
          <Text>Save Message</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  SaveMessageContainer: {
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10
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
