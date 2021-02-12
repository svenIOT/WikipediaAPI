import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/components/HomePage';
import FindPage from './src/components/FindPage';
import DetailsPage from './src/components/DetailsPage';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
            name="home"  
            component={HomePage}
            options={{ title: 'Inicio' }}
          />
          <Stack.Screen
            name="find"  
            component={FindPage}
            options={{ title: 'Búsquedas' }}
          />
          <Stack.Screen
            name="details"
            component={DetailsPage}
            options={{ title: 'Resultado' }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}