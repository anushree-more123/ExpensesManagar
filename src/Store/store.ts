import {configureStore} from '@reduxjs/toolkit';
import expensesSlice from '../Components/CreateExpenses/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
