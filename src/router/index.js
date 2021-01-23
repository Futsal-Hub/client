import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginPage, LandingPage, Fields, Matches, Players } from "../screens";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LandingPage" component={LandingPage} />
      <Tab.Screen name="Fields" component={Fields} />
      <Tab.Screen name="Players" component={Players} />
      <Tab.Screen name="Matches" component={Matches} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      {/* <Stack.Screen name="Fields" component={MainApp} />
      <Stack.Screen name="Matches" component={MainApp} />
      <Stack.Screen name="Players" component={MainApp} /> */}
    </Stack.Navigator>
  );
};

export default Router;
