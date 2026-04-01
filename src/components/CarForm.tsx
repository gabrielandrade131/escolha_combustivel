import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface CarFormProps {
  onSubmit: (car: { name: string; consumption: string }) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [consumption, setConsumption] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do carro</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: Gol 1.0"
      />
      <Text style={styles.label}>Consumo médio (km/l)</Text>
      <TextInput
        style={styles.input}
        value={consumption}
        onChangeText={setConsumption}
        placeholder="Ex: 10"
        keyboardType="numeric"
      />
      <Button
        title="Cadastrar"
        onPress={() => {
          if (name && consumption) {
            onSubmit({ name, consumption });
            setName('');
            setConsumption('');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
