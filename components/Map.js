import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Picker,
  Alert,
  AsyncStorage
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { MapView, Location, Permissions, Constants } from "expo";
import Geocoder from "react-native-geocoding";
import geolib from "geolib";
import TextMessage from "./TextMessage.js";

Geocoder.setApiKey("AIzaSyBakh5h7JIfXWWZmj-vm08iGO0pXUwV4Y4");

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      radius: 200,
      address: "",
      location: {},
      markers: [],
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
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "Oops, this will not work."
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Address not found"
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
      },
      error => {
        Alert.alert(JSON.stringify(error));
      }
    );
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  beginTracking = async () => {
    try {
      AsyncStorage.getItem("contactChoice").then(digits => {
        this.setState({
          contact: digits
        });
      });
      AsyncStorage.getItem("message").then(userMessage => {
        this.setState({
          message: userMessage
        });
      });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
    let mark = this.state.markers;
    navigator.geolocation.getCurrentPosition(
      position => {
        mark.map(coord => {
          const distance = geolib.getDistance(position.coords, {
            latitude: coord.coordinate.latitude,
            longitude: coord.coordinate.longitude
          });
          if (distance > this.state.radius) {
            fetch("https://frozen-ridge-66479.herokuapp.com/message", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                contact: this.state.contact,
                message: this.state.message
              })
            })
              .then(response => {
                console.log(response);
              })
              .done();
          }
        });
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
    console.log(`render: ${this.state.contact} ${this.state.message}`);
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
          <Button
            // containerViewStyle={{ borderRadius: 10 }}
            buttonStyle={{ width: 100, height: 45, borderRadius: 10 }}
            // raised={true}
            backgroundColor="#4f7a89"
            color="black"
            style={styles.button}
            title="Search Address"
            onPress={this.getFromLocation}
          />
          <Button
            // containerViewStyle={{ borderRadius: 10 }}
            buttonStyle={{ width: 100, height: 45, borderRadius: 10 }}
            // raised={true}
            backgroundColor="#567884"
            color="black"
            style={styles.button}
            title="Begin Tracking!"
            onPress={this.beginTracking}
          />
          <Button
            // containerViewStyle={{ borderRadius: 10 }}
            buttonStyle={{ width: 100, height: 45, borderRadius: 10 }}
            // raised={true}
            backgroundColor="#586f77"
            color="black"
            style={styles.button}
            title="Kill Switch"
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
          {this.state.markers.map(marker => (
            <MapView>
              <MapView.Marker
                coordinate={marker.coordinate}
                title="Endpoint"
                key={marker.key}
              />
              <MapView.Circle
                center={marker.coordinate}
                radius={this.state.radius}
              />
            </MapView>
          ))}
        </MapView.Animated>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MapNavContainer: {
    flex: 1,
    // flexDirection: "row",
    // marginBottom: 500,
    // justifyContent: "space-between",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  },
  NavBoxContainer: {
    justifyContent: "space-around",
    // flex: 1,
    flexDirection: "row"
  },
  // paragraph: {
  //   margin: 10,
  //   fontSize: 10,
  //   textAlign: "center"
  // },
  AddressInput: {
    flex: 1,
    backgroundColor: "#aec3e5",
    padding: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    marginTop: 0
  }
});
