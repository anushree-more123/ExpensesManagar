// This is welcome screen only shown when there is no expense added for user

import {Text, View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const WelcomeScreen = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Track your spending. Simple and quick.
      </Text>
      <Text style={styles.subtitle}>
        Tap <Text style={[styles.plus, {color: colors.primary}]}>+</Text> to add
        an expense.
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    lineHeight: 24,
  },
  plus: {
    fontWeight: 'bold',
    color: '#566DFB',
  },
});
