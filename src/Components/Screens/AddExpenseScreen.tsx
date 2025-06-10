import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import {themeColors} from '../../theme/themeColors';

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setAmount('');
    } else if (key === '✓') {
      if (parseFloat(amount) > 0) setShowDetails(true);
    } else {
      setAmount(prev => (prev === '0.00' ? key : prev + key));
    }
  };

  const categories = [
    {label: 'Food and Drinks', icon: 'pizza-slice'},
    {label: 'Leisure', icon: 'face-smile-wink'},
    {label: 'Transportation', icon: 'bus'},
    {label: 'Health', icon: 'hand-holding-medical'},
    {label: 'Shopping', icon: 'cart-shopping'},
    {label: 'Utilities', icon: 'screwdriver-wrench'},
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('close')}>
          <AntDesign name="close" size={24} />
        </TouchableOpacity>
      </View>

      {/* Amount Display */}
      <TouchableOpacity onPress={() => setShowDetails(false)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
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
              onPress={() => setAmount('')}
              style={{paddingHorizontal: 10, paddingVertical: 5}}>
              <Icon name="delete-left" size={24} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {/* Content Area */}
      <View style={styles.flexArea}>
        {!showDetails ? (
          <>
            <View style={styles.flexSpacer} />
            <CalculatorKeyboard />
          </>
        ) : (
          <ScrollView contentContainerStyle={styles.detailsContainer}>
            <Text style={styles.sectionLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.label}
                  style={[
                    styles.categoryButton,
                    category === cat.label && styles.selectedCategory,
                  ]}
                  onPress={() => setCategory(cat.label)}>
                  <Icon name={cat.icon} size={24} />
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>Details</Text>
            <View style={styles.inputRow}>
              <Icon name="calendar" size={20} style={styles.inputIcon} />
              <TextInput placeholder="Today" style={styles.input} />
            </View>
            <View style={styles.inputRow}>
              <Icon name="sticky-note" size={20} style={styles.inputIcon} />
              <TextInput
                placeholder="Add a note..."
                value={note}
                onChangeText={setNote}
                style={styles.input}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currencySymbol: {
    fontSize: 20,
    color: '#888',
    marginRight: 4,
  },
  amountText: {
    fontSize: 48,
    // fontWeight: 'bold',
  },
  flexArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  flexSpacer: {
    flex: 1,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: themeColors[300],
    borderRadius: 10,
    padding: 10,
  },
  keyButton: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    backgroundColor: themeColors[100],
    borderRadius: 10,
    height: 50,
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingTop: 30,
    paddingBottom: 100,
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '30%',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#AED581',
  },
  categoryLabel: {
    marginTop: 6,
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 8,
    color: '#555',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});
