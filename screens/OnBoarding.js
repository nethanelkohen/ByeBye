import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';

class OnBoarding extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Onboarding
        showDone={true}
        onSkip={() => navigate('HomeScreen')}
        onDone={() => navigate('HomeScreen')}
        pages={[
          {
            title: `Daddy's Watching`,
            subtitle: `If you're a drunk piece of shit that gets wasted regularly, give your friends piece of mind by letting them know you made it home.`,
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="hand-peace-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Choose a Contact',
            subtitle: `Select a friend (or your partner, mother, etc) on the contacts screen.`,
            backgroundColor: '#5e92f3',
            image: (
              <Icon
                name="paper-plane-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Write a Message',
            subtitle:
              'Type your drunken nonsense message in the text field. It will be sent to your contact choice.',
            backgroundColor: '#1565c0',
            image: (
              <Icon
                name="bell-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: 'Enter Your Destination',
            subtitle: `Whether you're going home or to your ex's house, search for it on the map screen and click the marker button. Once you're within 50 meters of the destination, your message will automatically send and your friend will rest easy knowing you survived another drunken night.`,
            backgroundColor: '#1565c0',
            image: (
              <Icon
                name="bell-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          },
          {
            title: `Let Daddy Watch`,
            subtitle: (
              <Button
                title={'Let Daddy Watch'}
                containerViewStyle={{ marginTop: 20 }}
                backgroundColor={'white'}
                borderRadius={5}
                textStyle={{ color: '#003c8f' }}
                onPress={() => navigate('HomeScreen')}
              />
            ),
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="rocket"
                type="font-awesome"
                size={100}
                color="white"
              />
            )
          }
        ]}
      />
    );
  }
}

export default OnBoarding;
