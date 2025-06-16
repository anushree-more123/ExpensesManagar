import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {RootStackParamList} from '../Navigation/navigationTypes';

type NavigationProp = StackNavigationProp<RootStackParamList, 'UpdateExpenses'>;
interface TransactionItemProps {
  item: any;
}

const TransactionItem: React.FC<TransactionItemProps> = ({item}) => {
  const navigation = useNavigation<NavigationProp>();
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UpdateExpenses', {
          expenseDetails: item,
        });
      }}>
      <View style={styles.transactionItem}>
        <View style={[styles.iconWrapper, {backgroundColor: item.color}]}>
          <Icon name={item.icon} size={18} color="#fff" />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
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
      fontFamily: 'Roboto-Bold',
    },
    transactionSubtitle: {
      fontSize: 12,
      color: colors.placeholder,
      fontFamily: 'Roboto-Regular',
    },
    transactionAmount: {
      fontFamily: 'Roboto-Bold',
    },
  });

export default TransactionItem;
