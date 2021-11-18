import React,{useEffect} from 'react';
import { View, Text,StatusBar,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import GoogleMapScreen from './screens/GoogleMapScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false,
          headerStyle: { backgroundColor: '#3a53a6' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false,
          headerStyle: { backgroundColor: '#3a53a6' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerStyle: { backgroundColor: '#3a53a6' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;