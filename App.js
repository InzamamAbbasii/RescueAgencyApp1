import React,{useEffect} from 'react';
import { View, Text,StatusBar,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import GoogleMapScreen from './screens/GoogleMapScreen';
import Hospitals from './screens/Hospitals';
import FireBrigade from './screens/FireBrigade';
import PoliceStation from './screens/PoliceStation';
import Parkings from './screens/Parkings';
const Stack = createNativeStackNavigator();
function App() {
  global.ip='192.168.1.102';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false,
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false,
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} /> */}
        <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen} 
        options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Hospitals" component={Hospitals} 
        options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="FireBrigade" component={FireBrigade} 
        options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="PoliceStation" component={PoliceStation} 
        options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Parkings" component={Parkings} 
        options={{
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;