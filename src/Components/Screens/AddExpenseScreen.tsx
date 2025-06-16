import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {addExpenseHistory} from '../AddExpanses/expensesSlice';
import AmountDisplay from '../AddExpanses/AmountDisplay';
import CalculatorKeyboard from '../AddExpanses/CalculatorKeyboard';
import ExpenseDetailsForm from '../AddExpanses/ExpenseDetailsForm';

const AddExpenseScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const initialState = {amount: '', note: '', date: new Date(), category: ''};
  const [expenseDetails, setExpenseDetails] = useState({...initialState});
  const [showDetails, setShowDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleKeyPress = (key: string) => {
    const operators = ['+', '-', '*', '/', '.'];

    // if (key === 'C') {
    //   setExpenseDetails(prev => ({...prev, amount: ''}));
    //   return;
    // }

    if (key === '✓') {
      try {
        const cleanAmount = expenseDetails.amount.replace(/[-*+/\.]+$/, '');
        if (cleanAmount !== '') {
          const result = eval(cleanAmount);
          if (!isNaN(result)) {
            setExpenseDetails(prev => ({...prev, amount: result.toFixed(2)}));
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
        return {...prev, amount: prev.amount.slice(0, -1) + key};
      }
      return {...prev, amount: prev.amount + key};
    });
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpenseDetails(prev => ({...prev, date: selectedDate}));
    }
  };

  const clearState = () => {
    setShowDetails(false);
    setExpenseDetails({...initialState});
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
        id: uuid.v4(),
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
          <TouchableOpacity onPress={closeAddExpenses}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setShowDetails(false)}>
          <AmountDisplay
            amount={expenseDetails.amount}
            showDetails={showDetails}
            onBackspace={() =>
              setExpenseDetails(prev => ({
                ...prev,
                amount: prev.amount.slice(0, -1),
              }))
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flexArea}>
        {!showDetails ? (
          <CalculatorKeyboard onKeyPress={handleKeyPress} />
        ) : (
          <ExpenseDetailsForm
            expenseDetails={expenseDetails}
            setExpenseDetails={setExpenseDetails}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            onChangeDate={onChangeDate}
            onSave={saveExpense}
          />
        )}
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff', paddingTop: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between'},
    flexArea: {flexGrow: 1, justifyContent: 'flex-end'},
  });

export default AddExpenseScreen;
