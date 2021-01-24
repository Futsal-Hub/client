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
    const data = await AsyncStorage.getItem("access_token")
    return data != null ? JSON.parse(data) : null
  } catch (err) {
    console.log(err)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("access_token")
  } catch (err) {
    console.log(err)
  }
}