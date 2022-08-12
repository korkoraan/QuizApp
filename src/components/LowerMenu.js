import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function LowerMenu({navigation}) {
  return (
    <View style={styles.lower_menu}>
      <TouchableOpacity
        style={styles.lower_menu_button}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Text style={styles.pseudo_icon}> P </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lower_menu_button}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.pseudo_icon}> H </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lower_menu_button}>
        <Text style={styles.pseudo_icon}> . </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lower_menu: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    borderWidth: 1,
    borderColor: 'grey',
  },
  lower_menu_button: {
    marginHorizontal: 20,
    marginTop: 3,
    borderColor: 'grey',
    backgroundColor: 'white',
    width: 65,
    height: 65,
    borderRadius: 10,
    borderWidth: 1,
  },
  pseudo_icon: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
});
