import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import LowerMenu from '../components/LowerMenu';
import {getUserInfo} from '../functions';
import db from '../db';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const testImage = require('../res/blue_whale.jpg');

export default function QuizScreen({navigation}) {
  const [user, setUser] = useState();
  const [currentTheme, setCurrentTheme] = useState();
  const [themes, setThemes] = useState([]);
  const [menuShown, setMenuShown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [truthnessDisplayed, setTruthnessDisplayed] = useState(0);

  const QuestionBox = props => {
    // console.log(props);
    const {question} = props;
    let text = '';
    question.statements.forEach(s => {
      text += s.statement;
    });
    return (
      <View style={styles.questionBox}>
        <View style={styles.TextSection}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.text}>How true do you think this is?</Text>
        </View>
        <View style={styles.ImageSection}>
          <Image style={styles.image} source={testImage} />
        </View>
      </View>
    );
  };

  const TruthMeter = props => {
    const {truthness} = props;
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.truthness}> {truthness}% true </Text>
        <SubmitBtn />
      </View>
    );
  };

  const ThemeBtn = theme => {
    return (
      <View>
        <TouchableOpacity style={styles.themeBtn} onPress={() => {}}>
          <Text style={styles.pseudo_icon}> {theme.icon} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ThemesMenu = data => {
    const buttons = [];
    themes.forEach(theme => {
      buttons.push(<ThemeBtn theme={theme} />);
    });
    return (
      <View style={styles.questionBox}>
        {buttons}
        {/*<Image style={styles.image} source={data.image} />*/}
      </View>
    );
  };

  const storeCurrentQuestion = async question => {
    const question_ = JSON.stringify(question);
    await AsyncStorage.setItem('@currentQuestionIndex', question_);
  };

  const storeCurrentTheme = async theme => {
    const theme_ = JSON.stringify(theme);
    await AsyncStorage.setItem('@currentTheme', theme_);
  };

  const MenuOrQuestion = () => {
    // after completing the first theme level must gain level 1
    if (user.level < 1 || !menuShown) {
      const defaultTheme = themes.find(theme => theme.name === 'default');

      return <QuestionBox question={defaultTheme.questions[0]} />;
    } else {
      return <ThemesMenu themes={themes} />;
    }
  };

  const getThemes = async user => {
    return db.themes;
  };

  const submitAnswer = async () => {
    return true;
  };

  const SubmitBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submit_btn}
        onPress={() => {
          submitAnswer().catch(e => console.log(e));
          navigation.navigate('Result');
        }}>
        <Text style={styles.pseudo_icon}>-></Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const setup = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
      const themes_ = await getThemes(userInfo);
      setThemes(themes_);
      setLoading(false);
    };
    setup().catch(e => console.log(e));
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.main}>
        {loading ? <ActivityIndicator size="large" /> : <MenuOrQuestion />}
        {!loading && (
          <View style={styles.slider}>
            <MultiSlider
              min={0}
              max={100}
              step={1}
              onValuesChange={value => setTruthnessDisplayed(value)}
              onToggleOne={args => console.log(args)}
            />
          </View>
        )}
        {!loading && <TruthMeter truthness={truthnessDisplayed} />}
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
    // justifyContent: 'center',
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionBox: {
    flex: 0.88,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    width: 400,
  },
  TextSection: {
    flex: 0.4,
    alignItems: 'center',
  },
  ImageSection: {
    flex: 0.6,
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 7,
    borderColor: 'black',
  },
  themeBtn: {
    flex: 0.25,
    marginHorizontal: 20,
    marginTop: 3,
    borderColor: 'grey',
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
  },
  pseudo_icon: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  slider: {
    width: 300,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'white',
  },
  submit_btn: {
    marginLeft: 30,
    borderRadius: 15,
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  meterBox: {
    flex: 0.4,
    alignItems: 'center',
  },
  truthness: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
});
