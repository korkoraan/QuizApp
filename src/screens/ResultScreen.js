import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LowerMenu from '../components/LowerMenu';

const getAnswer = async () => {
  return true;
};

export default function ResultScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);
  const ResultBox = props => {
    let text = '';
    const {selectedValue} = props;
    if (selectedValue !== answer) {
      text = 'Well, not quite so.';
    } else {
      text = "You're exactly right!";
    }
    text += '\n ' + answer;
    return (
      <View style={styles.resultBox}>
        <View style={styles.TextSection}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.ImageSection}>
          <Text> HERE BE IMAGE </Text>
        </View>
        <View style={styles.BtnSection}>
          <SubmitBtn />
        </View>
      </View>
    );
  };

  const SubmitBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          navigation.navigate('Quiz');
        }}>
        <Text style={styles.pseudo_icon}>-></Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getAnswer()
      .then(info => {
        console.log(info);
        setAnswer(info);
      })
      .then(() => setLoading(false))
      .catch(e => console.log(e));
  }, []);

  return (
    <View style={styles.screen}>
      {loading ? <ActivityIndicator size="large" /> : <ResultBox />}
      <LowerMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  resultBox: {
    flex: 0.85,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    width: 350,
    borderWidth: 1,
    borderRadius: 7,
  },
  TextSection: {
    flex: 4,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  ImageSection: {
    flex: 3,
    width: 340,
    height: 340,
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 5,
  },
  BtnSection: {
    flex: 1,
  },
  submit_btn: {
    marginLeft: 30,
    marginTop: 10,
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
