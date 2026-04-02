
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useCarContext } from '../services/CarContext';



const FuelChoiceScreen: React.FC = () => {
  const { cars } = useCarContext();
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [ethanolPrice, setEthanolPrice] = useState('');
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [result, setResult] = useState('');
  const [routeType, setRouteType] = useState<'cidade' | 'rodovia'>('cidade');

  const handleCalculate = () => {
    if (cars.length === 0) {
      Alert.alert('Erro', 'Cadastre um carro primeiro.');
      return;
    }
    const car = cars[selectedCarIdx];
    const ethanol = parseFloat(ethanolPrice.replace(',', '.'));
    const gasoline = parseFloat(gasolinePrice.replace(',', '.'));
    let ethanolConsumption = 0;
    let gasolineConsumption = 0;
    if (routeType === 'cidade') {
      ethanolConsumption = parseFloat(car.ethanolCity);
      gasolineConsumption = parseFloat(car.gasolineCity);
    } else {
      ethanolConsumption = parseFloat(car.ethanolHighway);
      gasolineConsumption = parseFloat(car.gasolineHighway);
    }
    if (
      isNaN(ethanolConsumption) ||
      isNaN(gasolineConsumption) ||
      isNaN(ethanol) ||
      isNaN(gasoline)
    ) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }
    // Cálculo do custo por km
    const costEthanol = ethanol / ethanolConsumption;
    const costGasoline = gasoline / gasolineConsumption;
    if (costEthanol < costGasoline) {
      setResult('Abasteça com Etanol');
    } else {
      setResult('Abasteça com Gasolina');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha de Combustível</Text>
      <Text style={styles.label}>Selecione o carro:</Text>
      {cars.length === 0 ? (
        <Text style={{ color: 'red' }}>Nenhum carro cadastrado.</Text>
      ) : (
        <View style={styles.carList}>
          {cars.map((car, idx) => (
            <TouchableOpacity
              key={car.name + idx}
              style={[styles.carButton, selectedCarIdx === idx && styles.carButtonSelected]}
              onPress={() => setSelectedCarIdx(idx)}
              activeOpacity={0.8}
            >
              <Text style={[styles.carButtonText, selectedCarIdx === idx && styles.carButtonTextSelected]}>{car.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={styles.label}>Tipo de trajeto:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <TouchableOpacity
          style={[styles.routeButton, routeType === 'cidade' && styles.routeButtonSelected]}
          onPress={() => setRouteType('cidade')}
        >
          <Text style={[styles.routeButtonText, routeType === 'cidade' && styles.routeButtonTextSelected]}>Cidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.routeButton, routeType === 'rodovia' && styles.routeButtonSelected]}
          onPress={() => setRouteType('rodovia')}
        >
          <Text style={[styles.routeButtonText, routeType === 'rodovia' && styles.routeButtonTextSelected]}>Rodovia</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Preço do Etanol (R$)</Text>
        routeButton: {
          flex: 1,
          paddingVertical: 10,
          borderRadius: 4,
          backgroundColor: '#eee',
          alignItems: 'center',
          marginRight: 8,
        },
        routeButtonSelected: {
          backgroundColor: '#007bff',
        },
        routeButtonText: {
          color: '#333',
          fontWeight: 'bold',
        },
        routeButtonTextSelected: {
          color: '#fff',
        },
      <TextInput
        style={styles.input}
        value={ethanolPrice}
        onChangeText={setEthanolPrice}
        placeholder="Ex: 4.29"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Preço da Gasolina (R$)</Text>
      <TextInput
        style={styles.input}
        value={gasolinePrice}
        onChangeText={setGasolinePrice}
        placeholder="Ex: 5.99"
        keyboardType="numeric"
      />
      <Button title="Calcular" onPress={handleCalculate} disabled={cars.length === 0} />
      {result ? (
        <Text style={styles.result}>{result}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  carList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  carButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginRight: 8,
    marginTop: 8,
  },
  carButtonSelected: {
    backgroundColor: '#007bff',
  },
  carButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  carButtonTextSelected: {
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
    marginBottom: 12,
  },
  result: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
});

export default FuelChoiceScreen;
