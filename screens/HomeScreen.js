import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
import ByeByes from './ByeByes';
import { FormLabel, FormInput } from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mapScreenPress() {
    this.props.navigation.navigate('EventScreen');
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
        <Text>ERROR:{this.state.error}</Text>
        {this.renderButtonOrLoading()}
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
