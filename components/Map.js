import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Picker,
  Alert,
  AsyncStorage
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, Location, Permissions, Constants } from 'expo';
import Geocoder from 'react-native-geocoding';
import geolib from 'geolib';
import TextMessage from './TextMessage.js';

Geocoder.setApiKey('AIzaSyBakh5h7JIfXWWZmj-vm08iGO0pXUwV4Y4');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      location: {},
      markers: {},
      contact: null,
      message: null,
      coordinate: {
        latitude: null,
        longitude: null
      },
      errorMessage: null
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work.'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Address not found'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
      region: {
        ...location.coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };

  handleAddress = text => {
    this.setState({ address: text });
  };

  getFromLocation = () => {
    Geocoder.getFromLocation(this.state.address).then(
      json => {
        const geoLocation = json.results[0].geometry.location;
        let id = 0;
        this.setState({
          markers: {
            longitude: geoLocation.lng,
            latitude: geoLocation.lat
          }
        });
      },
      error => {
        Alert.alert(error);
      }
    );
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  beginTracking = async () => {
    try {
      AsyncStorage.getItem('contactChoice').then(digits => {
        this.setState({
          contact: digits
        });
      });
      AsyncStorage.getItem('message').then(userMessage => {
        this.setState({
          message: userMessage
        });
      });
    } catch (error) {
      Alert.alert(error);
    }
    let mark = this.state.markers;
    let radius = 50;
    navigator.geolocation.getCurrentPosition(
      position => {
        const distance = geolib.getDistance(position.coords, {
          latitude: mark.latitude,
          longitude: mark.longitude
        });
        if (distance < radius) {
          fetch('https://frozen-ridge-66479.herokuapp.com/message', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contact: this.state.contact,
              message: this.state.message
            })
          })
            .then(response => {
              console.log(response);
              Alert.alert('Your message was sent.');
            })
            .done();
        }
      },
      {
        enableHighAccuracy: true
      }
    );
  };

  killSwitch = () => {
    this.setState({ contact: null, message: null });
  };

  render() {
    console.log(this.state.contact, this.state.message);
    return (
      <View style={styles.MapNavContainer}>
        <TextInput
          style={styles.AddressInput}
          placeholder="Enter Address Here"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleAddress}
        />
        <View style={styles.NavBoxContainer}>
          <Icon
            name="search"
            type="feather"
            color="#517fa4"
            raised={true}
            onPress={this.getFromLocation}
          />
          <Icon
            name="target"
            type="feather"
            color="#517fa4"
            raised={true}
            onPress={this.beginTracking}
          />
          <Icon
            name="cancel"
            type="materialCommunityIcons"
            color="#517fa4"
            raised={true}
            onPress={this.killSwitch}
          />
        </View>
        <MapView.Animated
          style={{ flex: 6 }}
          showsUserLocation={true}
          // followsUserLocation={true}
          showsCompass={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          <MapView.Marker coordinate={this.state.markers} title="Endpoint" />
          {/* <MapView.Circle
            center={{
              latitude: this.state.markers.latitude,
              longitude: this.state.markers.longitude
            }}
            radius="100"
          /> */}
        </MapView.Animated>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MapNavContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  NavBoxContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  AddressInput: {
    flex: 1,
    backgroundColor: '#aec3e5',
    padding: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    marginTop: 0
  }
});
