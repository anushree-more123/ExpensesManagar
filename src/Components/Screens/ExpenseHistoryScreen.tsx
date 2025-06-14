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
        <Text style={styles.transactionTax}>{item.tax}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section: {title}}: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const monthlyTotals: BarDataItem[] = Object.values(
    expenseHistory.reduce((acc: Record<string, BarDataItem>, entry) => {
      const month = moment(entry.date).format('MMM');
      const amount = parseFloat(entry.amount);
      if (!acc[month]) {
        acc[month] = {label: month, value: 0};
      }
      acc[month].value += isNaN(amount) ? 0 : amount;
      return acc;
    }, {}),
  ).sort(
    (a, b) => moment(a.label, 'MMM').month() - moment(b.label, 'MMM').month(),
  );

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
            height={120}
            barWidth={20}
            barBorderRadius={6}
            frontColor="#FF9F40"
            data={monthlyTotals}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            noOfSections={5}
            xAxisLabelTextStyle={{
              color: '#E1D7F7',
              fontSize: 10,
              marginTop: 4,
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
    },
    cardAmount: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 4,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 120,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: colors.text,
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
      fontWeight: '600',
      color: colors.text,
    },
    transactionSubtitle: {
      fontSize: 12,
      color: colors.placeholder,
    },
    transactionAmount: {
      fontWeight: 'bold',
      color: colors.text,
    },
    transactionTax: {
      fontSize: 12,
      color: colors.placeholder,
    },
  });
