// Import react and component from react library.
import React, { Component } from 'react';
// Import react native components.
import { View, StyleSheet } from 'react-native';
// Import Map component.
import Map from '../components/Map.js';

// Create MapScreen component.
class MapScreen extends Component {
  // Create constructor and gain access to props and functions from parent.
  constructor(props) {
    super(props);
  }

  // Render React elements to device.
  render() {
    return (
      <View style={styles.container}>
        {/* Renders Map component. */}
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

export default MapScreen;
