import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginPage, SignUp, LandingPage, Fields, Matches, Players } from "../screens";
import { FontAwesome5 } from "@expo/vector-icons";
import BottomTabNavigator from "../components/BottomTabNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabNavigator {...props} />}>
      <Tab.Screen name="Home" component={LandingPage} />
      <Tab.Screen name="Fields" component={Fields} />
      <Tab.Screen name="Players" component={Players} />
      <Tab.Screen name="Matches" component={Matches} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Fields" component={MainApp} />
      <Stack.Screen name="Matches" component={MainApp} />
      <Stack.Screen name="Players" component={MainApp} /> */}
    </Stack.Navigator>
  );
};

export default Router;
