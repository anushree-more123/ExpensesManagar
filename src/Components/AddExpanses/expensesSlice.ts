import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ExpenseEntry = {
  amount: string;
  note: string;
  date: string;
  category: string;
};

type ExpensesState = {
  expenseHistory: ExpenseEntry[];
};

const initialState: ExpensesState = {
  expenseHistory: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenseHistory: (state, action: PayloadAction<ExpenseEntry[]>) => {
      state.expenseHistory = action.payload;
    },
    addExpenseHistory: (state, action: PayloadAction<ExpenseEntry>) => {
      state.expenseHistory.push(action.payload);
    },
  },
});

export const {setExpenseHistory, addExpenseHistory} = expensesSlice.actions;

export default expensesSlice.reducer;
