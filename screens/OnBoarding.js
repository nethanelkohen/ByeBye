// Import react and component from react library.
import React, { Component } from 'react';
// Import components for UI display.
import { Button, Icon } from 'react-native-elements';
// Import Onboarding componet from react-native-onboarding-swiper package.
import Onboarding from 'react-native-onboarding-swiper';

// Create OnBoarding component.
class OnBoarding extends Component {
  // Render React elements to device.
  render() {
    // Bring in navigation props.
    const { navigate } = this.props.navigation;
    return (
      // Render Onboarding component, which creates onboarding segment of app.
      <Onboarding
        showDone={true}
        // If user clicks onSkip, app navigates to HomeScreen.
        onSkip={() => navigate('HomeScreen')}
        // If user clicks onDone, app navigates to HomeScreen.
        onDone={() => navigate('HomeScreen')}
        // Pages to display in OnBoarding screen.
        pages={[
          {
            title: `Daddy's Watching`,
            subtitle: `If you're a drunk piece of shit who gets wasted regularly, give your friends piece of mind by letting them know you made it home.`,
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="user-secret"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Choose a Contact',
            subtitle: `Select a friend (or your partner, mother, etc) on the contacts screen.`,
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="optin-monster"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Write a Message',
            subtitle:
              'Type your drunken nonsense message in the text field or choose one of ours. It will be sent to your contact choice.',
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="clipboard"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Enter Your Destination',
            subtitle: `Whether you're going home or to your ex's house, search for it on the map screen and click the marker button. Once you're within 50 meters of the destination, your message will automatically send and your friend will rest easy knowing you survived another drunken night.`,
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="compass"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: `Let Daddy Watch`,
            backgroundColor: '#003c8f',
            image: (
              <Icon name="eye" type="font-awesome" size={100} color="white" />
            )
          }
        ]}
      />
    );
  }
}

export default OnBoarding;
