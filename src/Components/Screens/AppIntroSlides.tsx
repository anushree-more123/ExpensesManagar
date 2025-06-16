import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useTheme} from 'react-native-paper';
import SLIDEONEIMG from '../../../assets/SlideOne.png';
import SLIDTWOIMG from '../../../assets/SlideTwo.png';
import SLIDETHREEIMG from '../../../assets/SlideThree.png';

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
  const {colors} = useTheme();
  const styles = getStyles(colors);

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
      renderNextButton={() => (
        <View style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      )}
    />
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    slide: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.onBackground,
      fontSize: 22,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
    text: {
      color: colors.onSurface,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
    dot: {
      backgroundColor: colors.outline + '66',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: colors.primary,
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    button: {
      backgroundColor: colors[700],
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Roboto-Bold',
    },
  });

export default AppIntroSlides;
