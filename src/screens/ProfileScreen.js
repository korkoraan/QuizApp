import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import LowerMenu from '../components/LowerMenu';
import {getUserInfo} from '../functions';

export default function ProfileScreen({navigation}) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserInfo()
      .then(info => {
        console.log(info);
        setUser(info);
      })
      .then(() => setLoading(false))
      .catch(e => console.log(e));
  }, []);

  const UserInformation = () => {
    return (
      <View style={styles.intro}>
        <Text style={styles.text}> {user.name}</Text>
        <Text style={styles.text}> Level {user.level}</Text>
        <Text style={styles.text}> Wisdom {user.wisdom_points}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {loading ? <ActivityIndicator size="large" /> : <UserInformation />}
      <View style={styles.lower_panel} />
      <LowerMenu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    flex: 0.7,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    width: 300,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  lower_panel: {
    flexDirection: 'row',
    marginTop: 100,
  },
});
