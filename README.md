<img src="https://www.thewrap.com/wp-content/uploads/2014/08/nathan-for-you-daddys-watching.jpg.jpg" width="200" height="200" align="right">

# Daddy's Watching

 <br>

### _Make Sure That One Friend Gets Home Okay_

<br>

## Project Structure

```
├── Daddys_Watching    # Source code
│   ├── App.js         ## Begins navigation
│   ├──app.json        ## Handles Expo render data
│   ├── assets         ## Static assets
│   │   └── images     ### Images (png)
│   ├── components     ## Any shared components
│   │   └── ContactsComponent.js     ### Renders user contact and saves to storage
│   │   └── Map.js     ### Renders map, location tracking and makes Twilio API call
│   │   └── TextMessage.js     ### Renders user message and saves to storage
│   ├── screens        ### Any shared components
│   │   └── HomeScreen.js     ### Navigates to contact/message screen
│   │   └── MapScreen.js      ### Navigates to map
│   │
└── Daddys_Watching Server # Handles Twilio post API call
```

## What's Inside

<img src="./assets/images/react-native.png" align= "center" width="50" height="50" />

[React-Native](https://facebook.github.io/react-native/)

<img src="./assets/images/expo.png" align= "center" width="50" height="50" />

[Expo](https://expo.io/)

<img src="./assets/images/twilio.png" align= "center" width="50" height="50" />

[Twilio](https://www.twilio.com/)

<br>

## Contribute

Add to our project! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## Attribute

This app was built using [Create-React-Native-App](https://github.com/react-community/create-react-native-app). Big shout-out to the [Expo](https://github.com/expo) team for all the work they do.

## License

This React-Native app is under the [MIT License](https://github.com/nethanelkohen/ByeBye/blob/master/LICENSE).
