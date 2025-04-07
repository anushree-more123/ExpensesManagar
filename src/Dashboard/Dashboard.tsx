// src/screens/Dashboard.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  useColorScheme,
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const themedStyles = getStyles(isDark);

  return (
    <LinearGradient
      colors={isDark ? ['#121212', '#1f1f1f'] : ['#f2f2f2', '#ffffff']}
      style={themedStyles.container}>
      <Text style={themedStyles.title}>Expense Tracker</Text>

      <View style={themedStyles.card}>
        <Text style={themedStyles.amount}>$950.00</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            ...chartConfig,
            backgroundGradientFrom: isDark ? '#1e1e1e' : '#f2f2f2',
            backgroundGradientTo: isDark ? '#1e1e1e' : '#ffffff',
            color: () => (isDark ? '#5c6bc0' : '#3949ab'),
          }}
          withInnerLines={false}
          fromZero
          showValuesOnTopOfBars={false}
          style={themedStyles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
        />
      </View>

      <Text style={themedStyles.subtitle}>Recent Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={themedStyles.transaction}>
            <View
              style={[
                themedStyles.iconContainer,
                {backgroundColor: item.color},
              ]}>
              <Icon name={item.icon} size={25} color="#fff" />
            </View>
            <View style={themedStyles.info}>
              <Text style={themedStyles.type}>{item.type}</Text>
              <Text style={themedStyles.date}>{item.date}</Text>
            </View>
            <View style={themedStyles.right}>
              <Text style={themedStyles.amountText}>${item.amount}</Text>
              <Text style={themedStyles.balance}>${item.balance}</Text>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default Dashboard;

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 20,
      backgroundColor: isDark ? '#121212' : '#ffffff',
    },
    title: {
      fontSize: 24,
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#e0e0e0',
      borderRadius: 20,
      marginVertical: 20,
    },
    amount: {
      fontSize: 30,
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
      marginBottom: 10,
      padding: 20,
    },
    chart: {
      borderRadius: 12,
    },
    subtitle: {
      color: isDark ? '#fff' : '#000',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    transaction: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5',
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
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    date: {
      color: isDark ? '#aaa' : '#444',
      fontSize: 12,
    },
    right: {
      alignItems: 'flex-end',
    },
    amountText: {
      color: isDark ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    balance: {
      color: isDark ? '#aaa' : '#555',
      fontSize: 12,
    },
  });
