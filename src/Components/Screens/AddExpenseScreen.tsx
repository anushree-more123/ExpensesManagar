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
import {themeColors} from '../../theme/themeColors';
import {Button} from 'react-native-paper';

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleKeyPress = (key: string) => {
    const operators = ['+', '-', '*', '/', '.'];

    if (key === 'C') {
      setAmount('');
      return;
    }

    if (key === '✓') {
      try {
        const cleanAmount = amount.replace(/[-*+\/.]+$/, '');
        if (cleanAmount !== '') {
          const result = eval(cleanAmount);
          if (!isNaN(result)) {
            setAmount(result.toFixed(2));
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

    setAmount(prev => {
      const lastChar = prev.slice(-1);
      if (operators.includes(lastChar) && operators.includes(key)) {
        return prev.slice(0, -1) + key;
      }
      return prev + key;
    });
  };

  const categories = [
    {
      label: 'Food and Drinks',
      icon: 'pizza-slice',
      color: '#FF7043',
    },
    {label: 'Leisure', icon: 'face-smile-wink', color: '#81C784'},
    {label: 'Transportation', icon: 'bus', color: '#4FC3F7'},
    {label: 'Health', icon: 'hand-holding-medical', color: '#FF2C2C'},
    {label: 'Shopping', icon: 'cart-shopping', color: themeColors[700]},
    {label: 'Utilities', icon: 'screwdriver-wrench', color: '#5A5A5A'},
  ];

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
    setAmount('');
    setCategory('');
    setNote('');
    setDate(new Date());
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => clearState()}>
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
                {amount || '0.00'}
              </Text>
            </View>
            {!showDetails && amount !== '' && (
              <TouchableOpacity
                onPress={() => setAmount(prev => prev.slice(0, -1))}
                style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <Icon name="delete-left" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.flexArea}>
        {!showDetails ? (
          <>
            <View style={styles.flexSpacer} />
            <CalculatorKeyboard />
          </>
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
                      category === cat.label && {backgroundColor: cat.color},
                    ]}
                    onPress={() => setCategory(cat.label)}>
                    <Icon
                      name={cat.icon}
                      size={24}
                      color={category === cat.label ? '#fff' : cat.color}
                    />
                    <Text
                      style={[
                        styles.categoryLabel,
                        {color: category === cat.label ? '#fff' : '#000'},
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
                  <Text style={styles.input}>{date.toDateString()}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.inputRow}>
                <Icon name="sticky-note" size={20} style={styles.inputIcon} />
                <TextInput
                  placeholder="Add a note..."
                  value={note}
                  onChangeText={setNote}
                  style={styles.input}
                />
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  onChange={onChangeDate}
                  display="spinner"
                />
              )}
            </ScrollView>

            <Button
              mode="contained"
              onPress={() => console.log({amount, category, note, date})}
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

export default AddExpenseScreen;

const styles = StyleSheet.create({
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
  flexArea: {flex: 1, justifyContent: 'space-between', paddingBottom: 10},
  flexSpacer: {flex: 1},
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: themeColors[900],
    padding: 10,
  },
  keyButton: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    height: 80,
  },
  keyText: {fontSize: 30, color: themeColors[100]},
  detailsContainer: {paddingTop: 30, paddingBottom: 100, paddingHorizontal: 20},
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
    backgroundColor: themeColors[700],
    borderRadius: 8,
  },
});
