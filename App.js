import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// import {
//   LoginPage,
//   LandingPage,
//   Fields,
//   Matches,
//   Players,
// } from "./src/screens";
// import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";

export default function App() {
  const [isReady, setIsReady] = useState(true);
  // const Stack = createStackNavigator();

  async function fontloader() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setIsReady(false);
  }
  useEffect(() => {
    fontloader();
    // setIsReady(false);
  }, []);

  if (isReady) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {/* <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Fields" component={Fields} />
            <Stack.Screen name="Matches" component={Matches} />
            <Stack.Screen name="Players" component={Players} />
          </Stack.Navigator> */}
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}
