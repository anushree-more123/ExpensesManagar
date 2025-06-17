// screens/CategoryPieChartScreen.tsx
import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import moment from 'moment';

const categories = [
  {label: 'Food and Drinks', icon: 'pizza-slice', color: '#FF7043'},
  {label: 'Leisure', icon: 'face-smile-wink', color: '#81C784'},
  {label: 'Transportation', icon: 'bus', color: '#4FC3F7'},
  {label: 'Health', icon: 'hand-holding-medical', color: '#FF2C2C'},
  {label: 'Shopping', icon: 'cart-shopping', color: '#7B1FA2'},
  {label: 'Utilities', icon: 'screwdriver-wrench', color: '#5A5A5A'},
];

const sampleExpenses = [
  {category: 'Shopping', amount: 800.5, date: '2025-06-01'},
  {category: 'Shopping', amount: 500, date: '2025-06-05'},
  {category: 'Food and Drinks', amount: 300.49, date: '2025-06-03'},
  {category: 'Leisure', amount: 200, date: '2025-06-10'},
  {category: 'Transportation', amount: 120, date: '2025-06-12'},
  {category: 'Utilities', amount: 100, date: '2025-06-15'},
];

const groupByCategory = data => {
  const grouped = {};
  data.forEach(entry => {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry);
  });
  return grouped;
};

const ReportScreen = () => {
  const [period, setPeriod] = useState<'Monthly' | 'Weekly' | 'Yearly'>(
    'Monthly',
  );

  const groupedData = useMemo(
    () => groupByCategory(sampleExpenses),
    [sampleExpenses],
  );

  const pieData = useMemo(
    () =>
      Object.keys(groupedData).map(key => {
        const total = groupedData[key].reduce((sum, e) => sum + e.amount, 0);
        const categoryMeta = categories.find(c => c.label === key);
        return {
          value: total,
          color: categoryMeta?.color || '#ccc',
          label: key,
        };
      }),
    [groupedData],
  );

  const totalAmount = pieData.reduce((sum, p) => sum + p.value, 0);

  const renderLegendItem = ({item}) => {
    const meta = categories.find(c => c.label === item.label);
    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <Icon
              name={meta?.icon}
              size={20}
              color={meta?.color}
              style={{marginRight: 8}}
            />
            <Text style={styles.cardTitle}>{item.label}</Text>
          </View>
          <Text style={styles.cardAmount}>${item.value.toFixed(2)}</Text>
        </View>
        <Text style={styles.cardSubtitle}>
          {groupedData[item.label]?.length || 0} Transactions
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Summary</Text>
          <TouchableOpacity>
            <Text style={styles.periodSelector}>
              {moment().format('MMMM YYYY')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pieChartWrapper}>
          <PieChart
            data={pieData}
            donut
            showText
            textColor="#000"
            textSize={18}
            radius={90}
            innerRadius={60}
            centerLabelComponent={() => (
              <View>
                <Text style={styles.centerLabel}>Amount</Text>
                <Text style={styles.centerValue}>
                  ${totalAmount.toFixed(0)}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <FlatList
        data={pieData}
        renderItem={renderLegendItem}
        keyExtractor={item => item.label}
        contentContainerStyle={{padding: 20}}
      />
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  headerCard: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  periodSelector: {
    fontSize: 14,
    color: '#888',
  },
  pieChartWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  centerLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
  },
  centerValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
