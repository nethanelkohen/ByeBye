import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Hello World! You are on the Home Screen</Text>
          <Button onPress={() =>
          this.props.navigation.navigate('EventScreen')}
          title="Go to Events Screen" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
