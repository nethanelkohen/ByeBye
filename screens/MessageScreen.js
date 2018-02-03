// Import react and component from react library.
import React, { Component } from 'react';
// Import react native components.
import { View, StyleSheet } from 'react-native';
// Import TextMessage component.
import TextMessage from '../components/TextMessage.js';
// Import StackNavigator.
import { StackNavigator } from 'react-navigation';

// Create MessageScreen component.
class MessageScreen extends Component {
  // Create constructor and gain access to props and functions from parent.
  constructor(props) {
    super(props);
  }

  // Render React elements to device.
  render() {
    return (
      <View style={styles.container}>
        {/* Render TextMessage component which handles user's text messsage
          with navigation props for OnClick. */}
        <TextMessage navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MessageScreen;
