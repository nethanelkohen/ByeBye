import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Constants, Audio } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="byebye"
          onPress={async () => {
            const soundObject = new Expo.Audio.Sound();
            try {
              await soundObject.loadAsync(require('./assets/audio/byebye.mp3'));
              await soundObject.playAsync();
              // Your sound is playing!
              } catch (error) {
              // An error occurred!
              }
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
