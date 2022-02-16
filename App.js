import React, { useEffect } from 'react';
import { View, Text, StatusBar, LogBox } from 'react-native';
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
import Hospitals_Info from './screens/Hospitals_Info';
import PoliceStation_Info from './screens/PoliceStation_Info';
import FireBrigade_Info from './screens/FireBrigade_Info';
import Parking_Info from './screens/Parking_Info';
import GoogleMapWithSearch from './screens/GoogleMapWithSearch';
import EditHospital_Info from './screens/EditHospital_Info';
import EditFireBrigade_Info from './screens/EditFireBrigade_Info';
import EditParking_Info from './screens/EditParking_Info';
import EditPoliceStation_Info from './screens/EditPoliceStation_Info';
const Stack = createNativeStackNavigator();
function App() {
  global.ip = '192.168.1.102';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          headerShown: false,
          headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{
          headerShown: false,
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
        }} />
        <Stack.Screen name="GoogleMapScreen" component={GoogleMapScreen}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Hospitals" component={Hospitals}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="FireBrigade" component={FireBrigade}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="PoliceStation" component={PoliceStation}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Parkings" component={Parkings}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

        <Stack.Screen name="Hospitals_Info" component={Hospitals_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="FireBrigade_Info" component={FireBrigade_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="PoliceStation_Info" component={PoliceStation_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Parking_Info" component={Parking_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

        <Stack.Screen name="GoogleMapWithSearch" component={GoogleMapWithSearch}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

        <Stack.Screen name="EditHospital_Info" component={EditHospital_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="EditFireBrigade_Info" component={EditFireBrigade_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="EditPoliceStation_Info" component={EditPoliceStation_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="EditParking_Info" component={EditParking_Info}
          options={{
            headerStyle: { backgroundColor: '#12768c' }, headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;