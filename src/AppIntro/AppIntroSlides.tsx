import React from 'react';
import {View, Text, Image, StyleSheet, useColorScheme} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SLIDEONEIMG from '../../assets/SlideOne.png';
import SLIDTWOIMG from '../../assets/SlideTwo.png';
import SLIDETHREEIMG from '../../assets/SlideThree.png';

type AppIntroSlidesProps = {
  onDone: () => void;
};

type SlideItem = {
  key: string;
  title: string;
  text: string;
  image?: any;
};

const slides: SlideItem[] = [
  {
    key: '1',
    title: 'Track Your Expenses',
    text: 'Effortlessly track your expenses and manage your finances',
    image: SLIDEONEIMG,
  },
  {
    key: '2',
    title: 'Categorize Spending',
    text: 'Organize your expenses by category for better tracking',
    image: SLIDTWOIMG,
  },
  {
    key: '3',
    title: 'Set Budgets',
    text: 'Get insights into your spending habits with a detailed category-wise analysis',
    image: SLIDETHREEIMG,
  },
];

const AppIntroSlides: React.FC<AppIntroSlidesProps> = ({onDone}) => {
  const theme = useColorScheme(); // 'light' or 'dark'
  const isDark = theme === 'dark';

  const styles = getStyles(isDark);

  const renderItem = ({item}: {item: SlideItem}) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      bottomButton
    />
  );
};

const getStyles = (isDark: any) =>
  StyleSheet.create({
    slide: {
      flex: 1,
      backgroundColor: isDark ? '#0C0C0E' : '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    image: {
      width: 250,
      height: 250,
      marginBottom: 30,
      resizeMode: 'contain',
    },
    title: {
      color: isDark ? '#FFFFFF' : '#000000',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    text: {
      color: isDark ? '#BBBBBB' : '#444444',
      fontSize: 16,
      textAlign: 'center',
    },
    dot: {
      backgroundColor: isDark ? '#444' : '#CCC',
    },
    activeDot: {
      backgroundColor: isDark ? '#FFFFFF' : '#000000',
    },
  });

export default AppIntroSlides;
