import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ByeByeButton from '../components/ByeByeButton.js';
import Map from '../components/Map.js';
import axios from 'axios';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    axios
      .get('https://frozen-ridge-66479.herokuapp.com/api/byebye')
      .then(res => {})
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <Map style={styles.map} />
        <Button onPress={this._onPress} title="axios" />
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
