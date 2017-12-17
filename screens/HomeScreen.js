import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { TabNavigator } from "react-navigation";
import { Facebook } from "expo";
import ByeByes from "./ByeByes";

class HomeScreen extends Component {
  async logIn() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "134927923842970",
      {
        permissions: ["public_profile"]
      }
    );

    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World! You are on the Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate("EventScreen")}
          title="Go to Events Screen"
        />
        <Button onPress={this.logIn.bind(this)} title="Sign in with Facebook" />
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
  }
});

export default HomeScreenTabNavigator;
