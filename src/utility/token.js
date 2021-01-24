import AsyncStorage from '@react-native-async-storage/async-storage';
export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem("access_token", token)
  } catch (err) {
    console.log(err)
  }
}

export const getAccessToken = async () => {
  try {
    await AsyncStorage.getItem("access_token")
  } catch (err) {
    console.log(err)
  }
}