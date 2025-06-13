import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  expensesList: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpensesList: (state, action) => {
      state.expensesList = action.payload;
    },
  },
});

export const {setExpensesList} = expensesSlice.actions;
export default expensesSlice.reducer;
