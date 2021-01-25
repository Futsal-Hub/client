import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserLogin = async (payload) => {
    try {
      await AsyncStorage.setItem("userLogin", payload)
    } catch (err) {
      console.log(err)
    }
  }
  
  export const getUserLogin = async () => {
    try {
      const data = await AsyncStorage.getItem("userLogin")
      return data != null ? JSON.parse(data) : null
    } catch (err) {
      console.log(err)
    }
  }
  
  export const removeUserLogin = async () => {
    try {
      await AsyncStorage.removeItem("userLogin")
    } catch (err) {
      console.log(err)
    }
  }