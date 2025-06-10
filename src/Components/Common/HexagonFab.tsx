import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Path} from 'react-native-svg';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {themeColors} from '../../theme/themeColors';

const HexagonFAB = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.wrapper}>
      <Svg height="76" width="76" viewBox="0 0 100 100" style={styles.hexagon}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#B983FF" stopOpacity="1" />
            <Stop offset="100%" stopColor={themeColors[500]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d="M50 5 L90 27 L90 72 L50 95 L10 72 L10 27 Z"
          fill="url(#grad)"
          stroke={themeColors[500]}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </Svg>

      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HexagonFAB;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: -36,
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
  hexagon: {
    position: 'absolute',
  },
  touchable: {
    position: 'absolute',
    top: 28,
    alignSelf: 'center',
  },
});
