import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './src/Store/store';
import AppIntroSlides from './src/Components/AppIntro/AppIntroSlides';
import Navigator from './src/Components/Navigation/Navigator';

const AppLoaded = () => {
  const [isDone, setIsDone] = useState(false);
  const {expenseHistory} = useSelector((state: RootState) => state.expenses);

  return !isDone && expenseHistory.length === 0 ? (
    <AppIntroSlides onDone={() => setIsDone(true)} />
  ) : (
    <Navigator />
  );
};

export default AppLoaded;
