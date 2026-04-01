import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import CarForm from '../components/CarForm';

interface Car {
  name: string;
  consumption: string;
}

const CarRegisterScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const handleAddCar = (car: Car) => {
    setCars([...cars, car]);
    Alert.alert('Sucesso', 'Carro cadastrado!');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Cadastro de Carros
      </Text>
      <CarForm onSubmit={handleAddCar} />
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
