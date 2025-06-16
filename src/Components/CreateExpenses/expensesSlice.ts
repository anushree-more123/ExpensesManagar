import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ExpenseEntry = {
  id: string;
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
    updateExpenseHistory: (state, action: PayloadAction<ExpenseEntry>) => {
      const index = state.expenseHistory.findIndex(
        entry => entry.id === action.payload.id,
      );

      if (index !== -1) {
        state.expenseHistory[index] = action.payload;
      }
    },
  },
});

export const {setExpenseHistory, addExpenseHistory, updateExpenseHistory} =
  expensesSlice.actions;

export default expensesSlice.reducer;
