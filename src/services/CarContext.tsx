import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Car {
  name: string;
  consumption: string;
}

interface CarContextData {
  cars: Car[];
  addCar: (car: Car) => void;
}

const CarContext = createContext<CarContextData | undefined>(undefined);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCarContext must be used within CarProvider');
  return context;
};

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const addCar = (car: Car) => setCars((prev) => [...prev, car]);
  return (
    <CarContext.Provider value={{ cars, addCar }}>
      {children}
    </CarContext.Provider>
  );
};
