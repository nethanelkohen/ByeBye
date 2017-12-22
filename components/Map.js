import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
// import MapView from 'react-native-maps';
import AnimatedMarkers from './Marker.js'

  export default class Map extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        center: null,
        radius: 500,
        location: {},
        coordinate: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        errorMessage: null,
      }
    }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work.',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ 
      location,
      region: {
        ...location.coords,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
      }
     });

  };


  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    console.log(this.state)
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}> 
        <Text style={styles.paragraph}>{text}</Text>
         <MapView
          // provider={PROVIDER_GOOGLE}
          style={{ flex: 2 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          >
          
              <MapView.Marker
              key={1}
              // coordinate={{latitude: 37.78825, longitude: -122.4324}}
              coordinate={this.state.region}
              title={"Some Title"}
              description={"Hello world"}
              />
            
        </MapView>       
      </View>
    );
  }
}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 14,
    fontSize: 10,
    textAlign: 'center',
  },
});


