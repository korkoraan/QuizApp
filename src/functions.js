import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem('@user');
  return JSON.parse(userInfo);
};
