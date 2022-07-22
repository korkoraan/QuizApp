import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LowerMenu from './components/LowerMenu';

export default function ProfileScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <View style={styles.intro}>
        <Text style={styles.text}> *username*.</Text>
        <Text style={styles.text}> Neophyte</Text>
        <Text style={styles.text}> Level 1</Text>
      </View>
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
