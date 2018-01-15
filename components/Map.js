import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { Icon } from 'react-native-elements';
import { MapView, Location, Permissions, Constants } from 'expo';
import Geocoder from 'react-native-geocoding';
import geolib from 'geolib';

Geocoder.setApiKey('AIzaSyBakh5h7JIfXWWZmj-vm08iGO0pXUwV4Y4');

class Map extends Component {
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
      errorMessage: null,
      press: false
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
    Keyboard.dismiss();
    Geocoder.getFromLocation(this.state.address).then(
      json => {
        const geoLocation = json.results[0].geometry.location;
        let id = 0;
        this.setState({
          markers: {
            longitude: geoLocation.lng,
            latitude: geoLocation.lat
          },
          region: {
            longitude: geoLocation.lng,
            latitude: geoLocation.lat
          }
        });
      },
      error => {
        Alert.alert('Type in an address.');
      }
    );
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  beginTracking = async () => {
    this.setState({
      press: true
    });
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
      Alert.alert(JSON.stringify(error));
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
              message: `From Daddy's Watching: ${this.state.message}`
            })
          })
            .then(response => {
              Alert.alert('Message was sent!');
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
    this.setState({ contact: null, message: null, press: false });
  };

  render() {
    console.log(this.state.contact, this.state.message);
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
        <View style={styles.MapNavContainer}>
          <TextInput
            style={styles.AddressInput}
            placeholder="Where are you going?"
            controlled={true}
            multiline={false}
            placeholderTextColor="black"
            autoCapitalize="none"
            returnKeyType="search"
            onChangeText={this.handleAddress}
          />
          <View style={styles.IconTextBar}>
            <Text style={styles.IconText}>Search</Text>
            <Text style={styles.IconText}>Track Me</Text>
            <Text style={styles.IconText}>Cancel</Text>
          </View>
          <View style={styles.NavBoxContainer}>
            <Icon
              style={styles.Icon}
              name="search"
              type="feather"
              color="#517fa4"
              raised={true}
              onPress={this.getFromLocation}
            />
            <Icon
              style={styles.Icon}
              name="target"
              type="feather"
              color={!this.state.press ? '#517fa4' : '#a45156'}
              raised={true}
              onPress={this.beginTracking}
            />
            <Icon
              style={styles.Icon}
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
            followsUserLocation={false}
            showsCompass={true}
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
          >
            <MapView.Marker coordinate={this.state.markers} title="Endpoint" />
          </MapView.Animated>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  MapNavContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  IconText: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 0,
    fontSize: 17
  },
  Icon: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 0
  },
  IconTextBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 0
  },
  NavBoxContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  AddressInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 2,
    fontSize: 18,
    borderRadius: 10,
    fontSize: 20,
    alignSelf: 'stretch',
    marginTop: 0,
    borderWidth: 0.5
  },
  keyboard: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default Map;
