import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ByeByeButton from '../components/ByeByeButton.js';
import Map from '../components/Map.js';
import axios from 'axios';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Map style={styles.map} />
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
