import React, {useEffect, useState} from 'react';
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
import auth from '@react-native-firebase/auth';

const userExists = async username => {
  const result = await firestore()
    .collection('users')
    .where('name', '==', username)
    .get()
    .catch(err => console.error(err));
  return result._docs.length > 0;
};

const userValid = async user_info => {
  const exists = await userExists(user_info.name);
  if (exists) {
    return {valid: false, info: 'user already exists'};
  }
  const regex = /^[a-zA-Z0-9]+$/;
  const nameIsCorrect = regex.test(user_info.name);
  const passwordIsCorrect = user_info.password.length > 8;
  return {
    userValid: nameIsCorrect && passwordIsCorrect && !exists,
    userExists: exists,
    nameIsCorrect: nameIsCorrect,
    passwordIsCorrect: passwordIsCorrect,
  };
};

const addUser1 = async (username, password) => {
  const check = await userValid(username);
  if (check.valid) {
    firestore()
      .collection('users')
      .add({
        name: username,
        password: password,
      })
      .catch(err => console.error(err));
  }
};

const addUser = async (username, password) => {
  auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export default function AuthScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(usr) {
    setUser(usr);
    if (initializing) {
      setInitializing(false);
    }
  }

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
      <TouchableOpacity
        style={styles.test_btn}
        onPress={async () => {
          const creationLog = await addUser('stuart');
          if (creationLog.errorMessage !== undefined) {
            alert(creationLog.errorMessage);
          }
          // validUser('admin').then(check => console.log(check));
          // userExists('admin').then( e => console.log(e));
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
