import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import { socket } from "./src/config/socket";
import { getBookingByOwner, getBookingByPlayer } from "./src/store/actions";
// import { Button, Container, Content, Text } from "native-base";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { View, TouchableOpacity, Text } from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const [isReady, setIsReady] = useState(true);
  // const dispatch = useDispatch()
  // socket.on("fetch booking", () => {
  //   dispatch(getBookingByPlayer(playerId))
  //   dispatch(getBookingByOwner(ownerId))
  // })

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

  // const Tab = createBottomTabNavigator();

  // const ScreenOne = () => {
  //   return (
  //     <View style={{ top: 50, flex: 1, zIndex: 10 }}>
  //       <TouchableOpacity onPress={() => console.log("clik")}>
  //         <Text>ScreenOne</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const ScreenTwo = () => {
  //   return (
  //     <View style={{ top: 50, flex: 1, zIndex: 10 }}>
  //       <TouchableOpacity onPress={() => console.log("clik2")}>
  //         <Text>ScreenTwo</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  if (isReady) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {/* <Tab.Navigator>
            <Tab.Screen name="ScreenOne" component={ScreenOne} />
            <Tab.Screen name="ScreenTwo" component={ScreenTwo} />
          </Tab.Navigator>
          <MainApp /> */}
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}
