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
        {!showDetails && amount !== '' && (
          <TouchableOpacity onPress={() => setAmount('')}>
            <Icon name="backspace" size={24} />
          </TouchableOpacity>
        )}
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <Text style={styles.amountText}>{amount || '0.00'}</Text>
      </View>

      {/* Conditional UIs */}
      {!showDetails ? (
        <CalculatorKeyboard />
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
            <Icon name="event" size={20} style={styles.inputIcon} />
            <TextInput placeholder="Today" style={styles.input} />
          </View>
          <View style={styles.inputRow}>
            <Icon name="notes" size={20} style={styles.inputIcon} />
            <TextInput
              placeholder="Add a note..."
              value={note}
              onChangeText={setNote}
              style={styles.input}
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity
            onPress={() => console.log('Submit:', {amount, category, note})}
            style={styles.fab}>
            <Icon name="check" size={30} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currencySymbol: {
    fontSize: 28,
    color: '#888',
    marginRight: 4,
  },
  amountText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    // marginTop: 40,
    borderRadius: 10,
    // bottom: 0,
    // position: 'absolute',
    // right: 0,
  },
  keyButton: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    backgroundColor: '#A5D6A7',
    borderRadius: 10,
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 30,
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
  fab: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    padding: 16,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
