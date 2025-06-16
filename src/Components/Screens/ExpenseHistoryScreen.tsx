import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BarChart} from 'react-native-gifted-charts';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import {getFormattedHistory} from '../Utils/getFormattedHistory';
import {RootState} from '../../Store/store';
import moment from 'moment';

type BarDataItem = {
  label: string;
  value: number;
};

const ExpenseHistoryScreen = () => {
  const {colors} = useTheme();
  const isDark = useColorScheme() === 'dark';
  const styles = getStyles(colors, isDark);

  const expenseHistory = useSelector(
    (state: RootState) => state.expenses.expenseHistory,
  );

  const formattedHistory = getFormattedHistory(expenseHistory);
  console.log('formattedHistory', formattedHistory);
  const renderItem = ({item}: any) => (
    <View style={styles.transactionItem}>
      <View style={[styles.iconWrapper, {backgroundColor: item.color}]}>
        <Icon name={item.icon} size={18} color="#fff" />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section: {title}}: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  console.log('expenseHistory', expenseHistory);
  const currentYear = moment().year(); // e.g. 2025

  const monthlyTotals: BarDataItem[] = Object.values(
    expenseHistory
      .filter(entry => moment(entry.date).year() === currentYear) // only current year
      .reduce((acc: Record<string, BarDataItem>, entry) => {
        const month = moment(entry.date).format('MMM');

        const rawAmount =
          typeof entry.amount === 'number'
            ? entry.amount
            : parseFloat(entry.amount);

        const amount = isNaN(rawAmount) ? 0 : rawAmount;

        if (!acc[month]) {
          acc[month] = {label: month, value: 0};
        }

        acc[month].value += amount;

        return acc;
      }, {}),
  ).sort(
    (a, b) => moment(a.label, 'MMM').month() - moment(b.label, 'MMM').month(),
  );

  console.log('monthlyTotals (cleaned):', monthlyTotals);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Outcome</Text>
        <Text style={styles.cardAmount}>
          {' '}
          ₹
          {expenseHistory
            .reduce(
              (total, entry) => total + parseFloat(entry.amount || '0'),
              0,
            )
            .toFixed(2)}
        </Text>

        <View style={{marginTop: 24, height: 120}}>
          <BarChart
            height={110}
            barWidth={20}
            barBorderRadius={6}
            frontColor={colors['300']}
            data={monthlyTotals}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            noOfSections={5}
            xAxisLabelTextStyle={{
              color: '#E1D7F7',
              fontSize: 10,
            }}
            yAxisTextStyle={{color: '#E1D7F7', fontSize: 10}}
          />
        </View>
      </View>

      <SectionList
        sections={formattedHistory}
        keyExtractor={(item, index) => item.title + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default ExpenseHistoryScreen;

const getStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors['900'],
      borderRadius: 24,
      padding: 20,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 16,
    },
    cardTitle: {
      color: '#E1D7F7',
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
    },
    cardAmount: {
      color: '#fff',
      fontSize: 28,
      marginTop: 4,
      fontFamily: 'Roboto-Bold',
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    sectionHeader: {
      fontSize: 16,
      marginTop: 20,
      marginBottom: 10,
      color: colors.text,
      fontFamily: 'Roboto-Bold',
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    transactionTitle: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Roboto-Bold',
    },
    transactionSubtitle: {
      fontSize: 12,
      color: colors.placeholder,
      fontFamily: 'Roboto-Regular',
    },
    transactionAmount: {
      color: colors.text,
      fontFamily: 'Roboto-Bold',
    },
  });
