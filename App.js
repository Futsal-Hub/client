import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import { socket } from "./src/config/socket";


export default function App() {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    socket.emit("update", "fetching");
  });

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
  }, []);

  if (isReady) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}
