import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Dashboard from './src/Dashboard/Dashboard';
import AppIntroSlides from './src/AppIntro/AppIntroSlides';

function App(): React.JSX.Element {
  const [isDone, setIsDone] = useState(false);
  const checkIntroDone = () => {
    setIsDone(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {!isDone ? (
        <AppIntroSlides onDone={() => checkIntroDone()} />
      ) : (
        <Dashboard />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
