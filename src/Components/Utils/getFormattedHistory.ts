import {ExpenseEntry} from '../CreateExpenses/expensesSlice';
import {categories} from '../Constants/categories';

type SectionListData = {
  title: string;
  data: {
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    amount: string;
    id: string;
    date: string;
  }[];
};

export const getFormattedHistory = (
  expenseHistory: ExpenseEntry[],
): SectionListData[] => {
  const grouped: {
    [date: string]: (SectionListData['data'][0] & {timestamp: number})[];
  } = {};

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
      amount: entry.amount,
      timestamp: dateObj.getTime(),
      date: entry.date,
      id: entry.id,
    });
  });

  return Object.entries(grouped)
    .map(([title, rawData]) => ({
      title,
      data: rawData
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(({timestamp, ...rest}) => rest),
      timestamp: rawData[0]?.timestamp ?? 0,
    }))
    .sort((a, b) => {
      if (a.title === 'Today') return -1;
      if (b.title === 'Today') return 1;
      return b.timestamp - a.timestamp;
    })
    .map(({timestamp, ...rest}) => rest);
};
