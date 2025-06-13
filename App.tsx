import './gesture-handler';
import React, {useState} from 'react';
import {useColorScheme, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import AppIntroSlides from './src/Components/AppIntro/AppIntroSlides';
import {lightTheme, darkTheme} from './src/theme/theme';
import Navigator from './src/Components/Navigation/Navigator';

function App(): React.JSX.Element {
  const [isDone, setIsDone] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {!isDone ? (
            <AppIntroSlides onDone={() => setIsDone(true)} />
          ) : (
            <Navigator />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
