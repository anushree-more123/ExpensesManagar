import {ExpenseEntry} from '../AddExpanses/expensesSlice';
import {categories} from '../Constants/categories';

type SectionListData = {
  title: string;
  data: {
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    amount: string;
  }[];
};

export const getFormattedHistory = (
  expenseHistory: ExpenseEntry[],
): SectionListData[] => {
  // Group by formatted date (e.g., 'Today', '08 April')
  const grouped: {[date: string]: SectionListData['data']} = {};

  expenseHistory.forEach(entry => {
    const dateObj = new Date(entry.date);
    const today = new Date();
    const isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

    const formattedDate = isToday
      ? 'Today'
      : dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        });

    const categoryMeta = categories.find(c => c.label === entry.category) ?? {
      icon: 'question',
      color: '#ccc',
    };

    if (!grouped[formattedDate]) grouped[formattedDate] = [];

    grouped[formattedDate].push({
      icon: categoryMeta.icon,
      color: categoryMeta.color,
      title: entry.note || entry.category,
      subtitle: entry.category,
      amount: `-₹${entry.amount}`,
    });
  });

  // Convert grouped object to array
  return Object.entries(grouped).map(([title, data]) => ({title, data}));
};
