import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface CarFormProps {
  onSubmit: (car: {
    name: string;
    ethanolCity: string;
    gasolineCity: string;
    ethanolHighway: string;
    gasolineHighway: string;
  }) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [ethanolCity, setEthanolCity] = useState('');
  const [gasolineCity, setGasolineCity] = useState('');
  const [ethanolHighway, setEthanolHighway] = useState('');
  const [gasolineHighway, setGasolineHighway] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do carro</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: Gol 1.0"
      />
      <Text style={styles.label}>Consumo Etanol - Cidade (km/l)</Text>
      <TextInput
        style={styles.input}
        value={ethanolCity}
        onChangeText={setEthanolCity}
        placeholder="Ex: 7.5"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Consumo Gasolina - Cidade (km/l)</Text>
      <TextInput
        style={styles.input}
        value={gasolineCity}
        onChangeText={setGasolineCity}
        placeholder="Ex: 10.5"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Consumo Etanol - Rodovia (km/l)</Text>
      <TextInput
        style={styles.input}
        value={ethanolHighway}
        onChangeText={setEthanolHighway}
        placeholder="Ex: 9.0"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Consumo Gasolina - Rodovia (km/l)</Text>
      <TextInput
        style={styles.input}
        value={gasolineHighway}
        onChangeText={setGasolineHighway}
        placeholder="Ex: 13.0"
        keyboardType="numeric"
      />
      <View style={styles.buttonWrapper}>
        <Button
          title="Cadastrar"
          onPress={() => {
            if (
              name &&
              ethanolCity &&
              gasolineCity &&
              ethanolHighway &&
              gasolineHighway
            ) {
              onSubmit({
                name,
                ethanolCity,
                gasolineCity,
                ethanolHighway,
                gasolineHighway,
              });
              setName('');
              setEthanolCity('');
              setGasolineCity('');
              setEthanolHighway('');
              setGasolineHighway('');
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 8,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
    marginBottom: 12,
  },
});

export default CarForm;
