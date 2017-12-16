import React from "react";
import { View, StyleSheet, Button } from "react-native";

const ByeByeButton = () => (
  <View style={styles.container}>
    <Button
      title="byebye"
      onPress={async () => {
        const soundObject = new Expo.Audio.Sound();
        try {
          await soundObject.loadAsync(require("../assets/audio/byebye.mp3"));
          await soundObject.playAsync();
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "stretch",
    justifyContent: "center"
  }
});

export default ByeByeButton;
