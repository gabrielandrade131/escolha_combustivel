
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useCarContext } from '../services/CarContext';


const FuelChoiceScreen: React.FC = () => {
  const { cars } = useCarContext();
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [ethanolPrice, setEthanolPrice] = useState('');
  const [gasolinePrice, setGasolinePrice] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    if (cars.length === 0) {
      Alert.alert('Erro', 'Cadastre um carro primeiro.');
      return;
    }
    const car = cars[selectedCarIdx];
    const consumption = parseFloat(car.consumption);
    const ethanol = parseFloat(ethanolPrice.replace(',', '.'));
    const gasoline = parseFloat(gasolinePrice.replace(',', '.'));
    if (isNaN(consumption) || isNaN(ethanol) || isNaN(gasoline)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }
    // Fórmula: (etanol/gasolina) < 0.7 => etanol compensa
    const ratio = ethanol / gasoline;
    if (ratio < 0.7) {
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
        cars.map((car, idx) => (
          <Button
            key={car.name + idx}
            title={car.name}
            color={selectedCarIdx === idx ? '#007bff' : '#ccc'}
            onPress={() => setSelectedCarIdx(idx)}
          />
        ))
      )}
      <Text style={styles.label}>Preço do Etanol (R$)</Text>
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
