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
import firestore from '@react-native-firebase/firestore';

const userExists = async username => {
  const user = await firestore().collection('users').doc(username).get();
  return user;
};

const getUsers = async () => {
  firestore()
    .collection('users')
    .doc('413gnOIQ3X3NImBjMHNR')
    .get()
    .then(data => console.log(data._data.name))
    .catch(err => console.error(err));
};

const validUser = user_info => {
  if (!userExists(user_info.name)) {
    return false;
  }
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(user_info.name);
};

const addUser = user_info => {
  if (!validUser(user_info)) {
    return false;
  }
  firestore()
    .collection('users')
    .add({
      name: user_info.name,
    })
    .then(() => {
      console.log('User added!');
    });
};

export default function AuthScreen({navigation}) {
  const SubmitBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          // addUser(nickname);
          navigation.navigate('Home');
        }}>
        <Text style={styles.pseudo_icon}>-></Text>
      </TouchableOpacity>
    );
  };

  const TestBtn = () => {
    return (
      <TouchableOpacity style={styles.test_btn} onPress={getUsers}>
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
