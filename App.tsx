import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Dashboard from './src/Dashboard/Dashboard';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Dashboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
