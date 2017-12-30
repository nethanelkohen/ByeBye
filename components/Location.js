import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { MapView, Location, Permissions, Constants } from "expo";
import Expo from "expo";
import Map from "../components/Map.js";

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};

export default class UserBLocation extends Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } }
  };

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = location => {
    (region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }),
      this.setState({ location, region });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <MapView
      // style={{ flex: 1 }}
      // showsUserLocation={true}
      // region={this.state.region}
      />
    );
  }
}
