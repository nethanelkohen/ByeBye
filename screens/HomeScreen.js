import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import App from '../App.js';
// import { Constants, Facebook } from 'expo';
import ByeByes from './ByeByes';
import { FormLabel, FormInput } from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLoginPress() {
    this.props.navigation.navigate('EventScreen');
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text> Loading </Text>;
    }
    return (
      <View>
        <Button onPress={this.onLoginPress.bind(this)} title="Map" />
      </View>
    );
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={email => this.setState({ email })}
          placeholder="nate@nycda.com"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry
          placeholder="*****"
          onChangeText={password => this.setState({ password })}
        />
        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}
      </View>
    );
  }
}

/*_handleFacebookLogin = async () => {
    const self = this;
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('134927923842970', {
        permissions: ['public_profile', 'user_events']
      });

      switch (type) {
        case 'success':
          {
            const response = await fetch(
              `https://graph.facebook.com/me/events?access_token=${token}`);
            const events = await response.json();
            console.log(events);
            self.setState({
              results: events
            });
            break;
          }
        case 'cancel':
          {
            Alert.alert('Cancelled!', 'Login was cancelled!');
            break;
          }
        default:
          {
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
        <Button
         title="Login with Facebook"
         onPress={this._handleFacebookLogin}
         />
        <Text>Hello World! You are on the Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate("EventScreen")}
          title="Go to Events Screen"
        />
      { this.state.results.data
        ? this.state.results.data.map((item) => {

            return (
                <View key={item.name}>
                  <Text>
                    {item.name}
                  </Text>
                </View>
              );
          })

        :
        null
        }
      </ScrollView>
    );
  }
}
}

{
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
   }; */

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
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default HomeScreenTabNavigator;
