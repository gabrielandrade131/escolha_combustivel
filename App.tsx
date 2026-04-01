
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CarRegisterScreen from './src/screens/CarRegisterScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CarRegisterScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Removido alignItems e justifyContent para não centralizar tudo
  },
});
