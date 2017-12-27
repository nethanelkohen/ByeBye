import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button,
  Dimensions,
  Picker
} from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyBakh5h7JIfXWWZmj-vm08iGO0pXUwV4Y4');

let id = 0;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      radius: 200,
      address: '',
      location: {},
      markers: [],
      coordinate: {
        latitude: null,
        longitude: null
      },
      errorMessage: null
    };
  }

  handleAddress = text => {
    console.log(text);
    this.setState({ address: text });
  };

  getFromLocation = () => {
    Geocoder.getFromLocation(this.state.address).then(
      json => {
        let geoLocation = json.results[0].geometry.location;
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: {
                longitude: geoLocation.lng,
                latitude: geoLocation.lat
              },
              key: `${id++}`
            }
          ]
        });
        console.log('this is what i want', geoLocation);
      },
      error => {
        alert(error);
      }
    );
  };

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
        errorMessage: 'Permission to access location was denied'
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

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleAddress}
        />
        <Button
          style={styles.button}
          title="go"
          onPress={this.getFromLocation}
        />
        <Picker
          selectedValue={this.state.radius}
          onValueChange={choice => this.setState({ radius: choice })}
        >
          <Picker.Item label="200" value={200} />
          <Picker.Item label="500" value={500} />
          <Picker.Item label="1000" value={1000} />
        </Picker>

        <MapView
          style={{ flex: 2 }}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {this.state.markers.map((marker, index) => (
            <MapView>
              <MapView.Marker
                key={index.key}
                coordinate={marker.coordinate}
                title="ByeBye"
                draggable
              />
              <MapView.Circle
                center={marker.coordinate}
                radius={this.state.radius}
              />
            </MapView>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 10,
    fontSize: 10,
    textAlign: 'center'
  }
});
