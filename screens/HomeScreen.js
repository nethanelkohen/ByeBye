import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ByeByes from './ByeByes';

class HomeScreen extends Component {
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

const HomeScreenTabNavigator = TabNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  ByeByes: {
    screen: ByeByes
  }
}, {
  animationEnabled: true
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreenTabNavigator;
