// src/screens/Dashboard.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';

const screenWidth = Dimensions.get('window').width;

const barChartData = {
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      data: [50, 50, 75, 90, 60, 45],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#1e1e1e',
  backgroundGradientTo: '#1e1e1e',
  fillShadowGradient: '#5c6bc0',
  fillShadowGradientOpacity: 1,
  color: () => '#5c6bc0',
  barPercentage: 0.6,
  decimalPlaces: 0,
};

const transactions = [
  {
    id: '1',
    type: 'Grocery',
    icon: 'cart-shopping',
    amount: 120,
    date: 'Apr 24',
    balance: 120,
    color: '#f57c00',
  },
  {
    id: '2',
    type: 'Transport',
    icon: 'bus',
    amount: 20,
    date: 'Apr 23',
    balance: 74,
    color: '#3949ab',
  },
  {
    id: '3',
    type: 'Shopping',
    icon: 'bag-shopping',
    amount: 75,
    date: 'Apr 14',
    balance: 20,
    color: '#d81b60',
  },
  {
    id: '4',
    type: 'Entertainment',
    icon: 'music',
    amount: 50,
    date: 'Apr 12',
    balance: 80,
    color: '#ff7043',
  },
];

const Dashboard = () => {
  return (
    <LinearGradient colors={['#121212', '#1f1f1f']} style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>

      <View style={styles.card}>
        <Text style={styles.amount}>$950.00</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={180}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromZero
          showValuesOnTopOfBars={false}
          style={styles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
        />
      </View>

      <Text style={styles.subtitle}>Recent Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.transaction}>
            <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
              <Icon name={item.icon} size={25} color="#fff" />
            </View>
            <View style={styles.info}>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.amountText}>${item.amount}</Text>
              <Text style={styles.balance}>${item.balance}</Text>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    marginVertical: 20,
  },
  amount: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  chart: {
    borderRadius: 12,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  type: {
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    color: '#aaa',
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  amountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  balance: {
    color: '#aaa',
    fontSize: 12,
  },
});
