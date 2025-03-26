import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const transactions = [
  {
    id: '1',
    category: 'Grocery',
    amount: '$120',
    date: 'Apr 24',
    icon: 'cart-outline',
    color: '#FFA07A',
  },
  {
    id: '2',
    category: 'Transport',
    amount: '$20',
    date: 'Apr 23',
    icon: 'car-outline',
    color: '#4682B4',
  },
  {
    id: '3',
    category: 'Shopping',
    amount: '$75',
    date: 'Apr 14',
    icon: 'bag-outline',
    color: '#FF69B4',
  },
  {
    id: '4',
    category: 'Entertainment',
    amount: '$50',
    date: 'Apr 12',
    icon: 'videocam-outline',
    color: '#FFA500',
  },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [{data: [200, 300, 400, 500, 600]}],
};

const Dashboard = () => {
  return (
    <View style={styles.container}>
      {/* Expense Tracker Header */}
      <Text style={styles.title}>Expense Tracker</Text>
      <Text style={styles.balance}>$950.00</Text>
      {/* Bar Chart */}
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={150}
        chartConfig={{
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#1E1E1E',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
        fromZero={true} // Ensure it's a boolean
        yAxisLabel="$" // Add yAxisLabel (e.g., "$" for currency)
        yAxisSuffix="k" // Add yAxisSuffix (e.g., "k" for thousands)
      />
      ;{/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Avatar.Icon
                size={40}
                icon={item.icon}
                style={{backgroundColor: item.color}}
              />
              <View style={styles.textContainer}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 10,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  category: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#AAA',
  },
  amount: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Dashboard;
