import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';

interface AmountDisplayProps {
  amount: string;
  showDetails: boolean;
  onBackspace: () => void;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  showDetails,
  onBackspace,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.amountMainContainer}>
      <View style={[styles.amountContainer, {flex: 1}]}>
        <Text style={styles.currencySymbol}>₹</Text>
        <Text
          style={styles.amountText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.3}>
          {amount || '0.00'}
        </Text>
      </View>
      {!showDetails && amount !== '' && (
        <TouchableOpacity
          onPress={onBackspace}
          style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <Icon name="delete-left" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    amountMainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    amountContainer: {flexDirection: 'row', alignItems: 'flex-end'},
    currencySymbol: {
      fontSize: 20,
      color: '#888',
      marginRight: 4,
      fontFamily: 'Roboto-Regular',
    },
    amountText: {
      fontSize: 48,
      fontFamily: 'Roboto-Medium',
    },
  });

export default AmountDisplay;
