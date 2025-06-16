import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

interface CalculatorKeyboardProps {
  onKeyPress: (key: string) => void;
}

const CalculatorKeyboard: React.FC<CalculatorKeyboardProps> = ({
  onKeyPress,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const keys = [
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '.',
    '0',
    '✓',
  ];

  return (
    <View style={styles.keyboard}>
      {keys.map(key => (
        <TouchableOpacity
          key={key}
          style={styles.keyButton}
          onPress={() => onKeyPress(key)}>
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    keyboard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors['900'],
      marginBottom: 0,
    },
    keyButton: {
      width: '22%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1%',
      height: 80,
    },
    keyText: {
      fontSize: 30,
      color: colors['100'],
      fontFamily: 'Roboto-Regular',
    },
  });

export default CalculatorKeyboard;
