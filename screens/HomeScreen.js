import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert, Image, ScrollView } from "react-native";
import { TabNavigator } from "react-navigation";
import { Constants, Facebook } from "expo";
import axios from 'axios';
import ByeByes from "./ByeByes";

class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  _handleFacebookLogin = async () => {
    const self = this;
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(
        '134927923842970', // Replace with your own app id in standalone app. I did mine
        { permissions: ['public_profile', 'user_events'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me/events?access_token=${token}`);
          const events = await response.json();
          console.log(events);
          self.setState({ events });
          break;
        }
        case 'cancel': {
          Alert.alert('Cancelled!', 'Login was cancelled!');
          break;
        }
        default: {
          Alert.alert('Oops!', 'Login failed!');
        }
      }
    } catch (e) {
      Alert.alert('Oops!', 'Login failed!');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Hello World! You are on the Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate("EventScreen")}
          title="Go to Events Screen"
        />
        {this.state.events
          ? <Text>{JSON.stringify(this.state.events)}</Text>
          :
          <Button
            title="Login with Facebook"
            onPress={this._handleFacebookLogin}
          />
        }


    </ScrollView>
    );
  }
}

{/*
  _renderUserInfo = () => {
   return (
     <View style={{ alignItems: 'center' }}>
{      <Image
        source={{ uri: this.state.userInfo.picture.data.url }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
       />  }
     <Text style={{ fontSize: 20 }}>{this.state.userInfo.data}</Text>
     </View>
   );
 }; */}

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
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default HomeScreenTabNavigator;
