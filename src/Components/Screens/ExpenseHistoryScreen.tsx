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
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSelector} from 'react-redux';
import {getFormattedHistory} from '../Utils/getFormattedHistory';
import {RootState} from '../../Store/store';

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
        <Text style={styles.transactionTax}>{item.tax}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({section: {title}}: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Outcome</Text>
        <Text style={styles.cardAmount}>$12,560.00</Text>
        <View style={styles.chartRow}>
          {['Aug', 'Oct', 'Dec', 'Feb', 'Mar', 'Apr'].map((month, index) => (
            <View key={month} style={styles.chartItem}>
              <View
                style={[
                  styles.chartBar,
                  {
                    height: index === 5 ? 60 : 30 + index * 6,
                    backgroundColor:
                      index === 5 ? '#FF9F40' : isDark ? '#9986D6' : '#CCC4EB',
                  },
                ]}
              />
              <Text style={styles.chartMonth}>{month}</Text>
            </View>
          ))}
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
      backgroundColor: isDark ? '#5A31A6' : '#4B1FA2',
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
    chartRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    chartItem: {
      alignItems: 'center',
    },
    chartBar: {
      width: 10,
      borderRadius: 4,
    },
    chartMonth: {
      color: '#E1D7F7',
      fontSize: 10,
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
