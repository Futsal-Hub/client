import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux'
import store from './src/store'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { LoginPage, LandingPage } from './src/screens';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const Stack = createStackNavigator()

  async function fontloader() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }
  useEffect(() => {
    fontloader()
    setIsReady(true)
  }, [])

  if (!isReady) {
    return (
      <AppLoading />
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
          <Stack.Screen name="LandingPage" component={LandingPage}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
