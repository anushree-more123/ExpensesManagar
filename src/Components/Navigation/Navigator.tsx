import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import AddUpdateExpenseScreen from '../Screens/AddUpdateExpenseScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddExpenses"
          component={AddUpdateExpenseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateExpenses"
          component={AddUpdateExpenseScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
