import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {useTheme} from 'react-native-paper';

interface BarChartCardProps {
  totalAmount: string;
  monthlyTotals: {label: string; value: number}[];
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  totalAmount,
  monthlyTotals,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Outcome</Text>
      <Text style={styles.cardAmount}> ₹{totalAmount}</Text>

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
          xAxisLabelTextStyle={{color: '#E1D7F7', fontSize: 10}}
          yAxisTextStyle={{color: '#E1D7F7', fontSize: 10}}
        />
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
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
  });

export default BarChartCard;
