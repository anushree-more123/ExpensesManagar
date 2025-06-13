import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addExpenseHistory} from '../AddExpanses/expensesSlice';
import {RootState} from '../../Store/store';
import {categories} from '../Constants/categories';

interface AddExpenseScreenProps {
  navigation: any;
  route: any;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const initialState = {amount: '', note: '', date: new Date(), category: ''};
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [showDetails, setShowDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({...initialState});

  const handleKeyPress = (key: string) => {
    const operators = ['+', '-', '*', '/', '.'];

    if (key === 'C') {
      setExpenseDetails(prev => ({
        ...prev,
        amount: '',
      }));
      return;
    }

    if (key === '✓') {
      try {
        const cleanAmount = expenseDetails.amount.replace(/[-*+\/.]+$/, '');
        if (cleanAmount !== '') {
          const result = eval(cleanAmount);
          if (!isNaN(result)) {
            setExpenseDetails(prev => ({
              ...prev,
              amount: result.toFixed(2),
            }));

            setShowDetails(true);
          }
        } else {
          setShowDetails(true);
        }
      } catch (e) {
        console.warn('Invalid expression');
      }
      return;
    }

    setExpenseDetails(prev => {
      const lastChar = prev.amount.slice(-1);
      if (operators.includes(lastChar) && operators.includes(key)) {
        return {
          ...prev,
          amount: prev.amount.slice(0, -1) + key,
        };
      }
      return {
        ...prev,
        amount: prev.amount + key,
      };
    });
  };

  const CalculatorKeyboard = () => {
    const keys = [
      '/',
      '7',
      '8',
      '9',
      '*',
      '4',
      '5',
      '6',
      '-',
      '1',
      '2',
      '3',
      '+',
      '.',
      '0',
      '✓',
    ];

    return (
      <View style={styles.keyboard}>
        {keys.map(key => (
          <TouchableOpacity
            key={key}
            style={styles.keyButton}
            onPress={() => handleKeyPress(key)}>
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const clearState = () => {
    setShowDetails(false);
    setExpenseDetails({...initialState});
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpenseDetails(prev => ({
        ...prev,
        date: selectedDate,
      }));
    }
  };

  const closeAddExpenses = () => {
    if (showDetails) {
      clearState();
      navigation.navigate('Home');
    } else {
      setShowDetails(true);
    }
  };

  const saveExpense = () => {
    if (expenseDetails.amount.length > 0) {
      let cpyExpenseD = {
        ...expenseDetails,
        date: expenseDetails.date.toISOString(),
      };

      if (cpyExpenseD.category.length === 0) {
        cpyExpenseD.category = 'Others';
      }

      dispatch(addExpenseHistory(cpyExpenseD));
      closeAddExpenses();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => closeAddExpenses()}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setShowDetails(false)}>
          <View style={styles.amountMainContainer}>
            <View style={[styles.amountContainer, {flex: 1}]}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text
                style={styles.amountText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.3}>
                {expenseDetails.amount || '0.00'}
              </Text>
            </View>
            {!showDetails && expenseDetails.amount !== '' && (
              <TouchableOpacity
                onPress={() => {
                  setExpenseDetails(prev => ({
                    ...prev,
                    amount: prev.amount.slice(0, -1),
                  }));
                }}
                style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <Icon name="delete-left" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.flexArea}>
        {!showDetails ? (
          <CalculatorKeyboard />
        ) : (
          <View style={styles.detailsContainer}>
            <ScrollView>
              <Text style={styles.sectionLabel}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      styles.categoryButton,
                      expenseDetails.category === cat.label && {
                        backgroundColor: cat.color,
                      },
                    ]}
                    onPress={() =>
                      setExpenseDetails(prev => ({
                        ...prev,
                        category: cat.label,
                      }))
                    }>
                    <Icon
                      name={cat.icon}
                      size={24}
                      color={
                        expenseDetails.category === cat.label
                          ? '#fff'
                          : cat.color
                      }
                    />
                    <Text
                      style={[
                        styles.categoryLabel,
                        {
                          color:
                            expenseDetails.category === cat.label
                              ? '#fff'
                              : '#000',
                        },
                      ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionLabel}>Details</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={styles.inputRow}>
                  <Icon name="calendar" size={20} style={styles.inputIcon} />
                  <Text style={styles.input}>
                    {expenseDetails.date.toDateString()}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.inputRow}>
                <Icon name="sticky-note" size={20} style={styles.inputIcon} />
                <TextInput
                  placeholder="Add a note..."
                  value={expenseDetails.note}
                  onChangeText={text =>
                    setExpenseDetails(prev => ({
                      ...prev,
                      note: text,
                    }))
                  }
                  style={styles.input}
                />
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={expenseDetails.date}
                  mode="date"
                  onChange={onChangeDate}
                  display="spinner"
                />
              )}
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => saveExpense()}
              style={styles.saveButton}
              contentStyle={{paddingVertical: 8}}
              labelStyle={{fontSize: 16}}>
              Save Expense
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff', paddingTop: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between'},
    amountMainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    amountContainer: {flexDirection: 'row', alignItems: 'flex-end'},
    currencySymbol: {fontSize: 20, color: '#888', marginRight: 4},
    amountText: {fontSize: 48},
    flexArea: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    keyboard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: colors['900'],
      marginBottom: 0,
    },
    keyButton: {
      width: '22%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '1%',
      height: 80,
    },
    keyText: {fontSize: 30, color: colors['100']},
    detailsContainer: {
      flexGrow: 1,
      paddingTop: 30,
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    sectionLabel: {fontSize: 16, marginBottom: 10, fontWeight: '500'},
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryButton: {
      width: '32%',
      backgroundColor: '#eee',
      padding: 10,
      marginBottom: '2%',
      borderRadius: 8,
      alignItems: 'center',
      height: 100,
      justifyContent: 'center',
    },
    categoryLabel: {marginTop: 6, fontSize: 14},
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    inputIcon: {marginRight: 8, color: '#555'},
    input: {flex: 1, fontSize: 16, paddingVertical: 8},
    saveButton: {
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors['700'],
    },
  });

export default AddExpenseScreen;
