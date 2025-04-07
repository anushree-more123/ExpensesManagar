import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const GetStarted = () => {
  const {colors} = useTheme();
  const themedStyles = getStyles(colors);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Get started!</Text>
      <Text style={themedStyles.subTitle}>
        Track your spending effortlessly. Tap + to log an expense.
      </Text>
    </View>
  );
};

export default GetStarted;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.onBackground,
    },
    subTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.onBackground,
    },
  });
