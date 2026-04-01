import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarRegisterScreen from '../screens/CarRegisterScreen';
import FuelChoiceScreen from '../screens/FuelChoiceScreen';

export type RootStackParamList = {
  CarRegister: undefined;
  FuelChoice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CarRegister">
      <Stack.Screen name="CarRegister" component={CarRegisterScreen} options={{ title: 'Cadastro de Carros' }} />
      <Stack.Screen name="FuelChoice" component={FuelChoiceScreen} options={{ title: 'Escolha de Combustível' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
