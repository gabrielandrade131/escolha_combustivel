import React from 'react';
import { View, Text, FlatList, Alert, Button } from 'react-native';
import CarForm from '../components/CarForm';
import { useCarContext } from '../services/CarContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CarRegister'>;

const CarRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { cars, addCar } = useCarContext();

  const handleAddCar = (car: { name: string; consumption: string }) => {
    addCar(car);
    Alert.alert('Sucesso', 'Carro cadastrado!');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Título removido, pois já está no header da navegação */}
      <CarForm onSubmit={handleAddCar} />
      <Button
        title="Ir para escolha de combustível"
        onPress={() => navigation.navigate('FuelChoice')}
        disabled={cars.length === 0}
      />
      <Text style={{ marginTop: 24, fontWeight: 'bold' }}>Carros cadastrados:</Text>
      <FlatList
        data={cars}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name} - {item.consumption} km/l
          </Text>
        )}
      />
    </View>
  );
};

export default CarRegisterScreen;
