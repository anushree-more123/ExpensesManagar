import {ExpenseEntry} from '../CreateExpenses/expensesSlice';

export type RootStackParamList = {
  UpdateExpenses: {
    expenseDetails: ExpenseEntry;
  };
};
