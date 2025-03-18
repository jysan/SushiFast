import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menus from './src/view/Menus'; 
import Login from './src/view/Login';
import { RootStackParamList } from './src/navigation/navigation'; 


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menus" component={Menus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
