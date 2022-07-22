import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LowerMenu from './components/LowerMenu';

export default function HomeScreen({navigation}) {
  const SubmitBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Text style={styles.pseudo_icon}>-></Text>
      </TouchableOpacity>
    );
  };
  const InfoBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.pseudo_icon}>?</Text>
      </TouchableOpacity>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  const PopUpInfo = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.pressable_info}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                  Here be explanation text. We need to implement user settings
                  and multilingual support first.
                </Text>
              </ScrollView>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.intro}>
        <Text style={styles.text}> Hi! Welcome to QuizApp.</Text>
      </View>
      <PopUpInfo />
      <View style={styles.lower_panel}>
        <InfoBtn />
        <SubmitBtn />
      </View>
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
  submit_btn: {
    marginHorizontal: 50,
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  pseudo_icon: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  lower_panel: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
  },
  pressable_info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
