import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';

interface TransactionItemProps {
  item: any;
}

const TransactionItem: React.FC<TransactionItemProps> = ({item}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
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

export default TransactionItem;
