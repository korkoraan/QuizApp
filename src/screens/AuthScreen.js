import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({navigation}) {
  const SubmitBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.pseudo_icon}>-></Text>
      </TouchableOpacity>
    );
  };

  const TestBtn = () => {
    return (
      <TouchableOpacity
        style={styles.test_btn}
        onPress={async () => {
          try {
            // fake auth
            const userInfo = JSON.stringify({
              name: 'El-Gemal',
              level: 0,
              wisdom_points: 0,
            });
            await AsyncStorage.setItem('@user', userInfo);
          } catch (e) {
            throw e;
          }
          navigation.navigate('Quiz');
        }}>
        <Text style={styles.pseudo_icon}>?</Text>
      </TouchableOpacity>
    );
  };

  const [nickname, setNickname] = useState('');

  const checkNickname = () => {
    return nickname !== '' ? SubmitBtn(navigation) : null;
  };
  const headerText = () => {
    return nickname === '' ? 'Welcome!' : 'Welcome, ' + nickname + '!';
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <View style={styles.auth_card}>
        <Text style={styles.text}> {headerText()} </Text>
        <TextInput
          style={styles.textInput}
          placeholder={' name'}
          onChangeText={text => {
            setNickname(text);
          }}
        />
      </View>
      <TestBtn />
      <View>{checkNickname()}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auth_card: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 250,
    marginTop: 100,
  },
  text: {
    color: 'black',
  },
  textInput: {
    flex: 0.2,
    height: 20,
    width: 230,
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 10,
  },
  submit_btn: {
    position: 'absolute',
    marginTop: 40,
    marginStart: 70,
    borderRadius: 15,
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  test_btn: {
    marginTop: 40,
    marginStart: 70,
    borderRadius: 15,
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  pseudo_icon: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
});
