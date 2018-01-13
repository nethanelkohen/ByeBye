import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TextMessage from '../components/TextMessage.js';
import { StackNavigator } from 'react-navigation';

class MessageScreen extends Component {
  // static navigationOptions = {
  //   title: 'MessageScreen'
  // };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
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
