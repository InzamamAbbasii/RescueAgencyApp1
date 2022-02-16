import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, PermissionsAndroid, ToastAndroid, LogBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
const GoogleMapScreen = ({ navigation }) => {
  const [lat, setLat] = useState(31.31241731792987); // pakistan lat
  const [lng, setLng] = useState(69.3550318966653); //pakistan lng
  const [userCurrentLocation, setUserCurrentLocation] = useState({
    latitude: 33.64138731315475,
    longitude: 73.07977021488884,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0043,
  });
  useEffect(() => {
    LogBox.ignoreAllLogs();
    // Geolocation.getCurrentPosition((info) => {
    //   setLat(info.coords.latitude); setLng(info.coords.longitude)
    //   // console.log(info.coords.latitude);
    // });
    getCurrentLocation();
  }, [])
  const getCurrentLocation = () => {
    var response = request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (response = 'granted') {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserCurrentLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            // latitudeDelta: 0.0043,
            // longitudeDelta: 0.0043,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.01,
          })
          console.log("User Location ----: ", coords);
        },
        (error) => {
          if (error.code != 5) {
            ToastAndroid.show(error.code + ' ' + error.message, ToastAndroid.LONG);
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }
  // ================.===========Getting User Current Location=========.=========================
  //   const requestLocationPermission = () => {
  //     var response = request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     if (response = 'granted') {
  //         Geolocation.getCurrentPosition(
  //             ({ coords }) => {
  //                 setUserCurrentLocation({
  //                     latitude: coords.latitude,
  //                     longitude: coords.longitude,
  //                     latitudeDelta: 0.0043,
  //                     longitudeDelta: 0.0043,
  //                 })
  //                 console.log("User Location ----: ");
  //             },
  //             (error) => {
  //                 if (error.code != 5) {
  //                     ToastAndroid.show(error.code + ' ' + error.message, ToastAndroid.LONG);
  //                 }
  //             },
  //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //         )
  //     }
  // }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        // style={styles.map}
        style={styles.container}
         // showsUserLocation={true}
         showsMyLocationButton={true}
        region={{
          latitude: userCurrentLocation.latitude,
          longitude: userCurrentLocation.longitude,
          latitudeDelta: userCurrentLocation.latitudeDelta,
          longitudeDelta: userCurrentLocation.longitudeDelta,
        }}
        onRegionChangeComplete={region => {
          setTimeout(() => {
            setUserCurrentLocation({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
              // latitudeDelta: 0.0043,
              // longitudeDelta: 0.01,
            })
          }, 2);
        }}
      >
        <Marker
          coordinate={{
            latitude: userCurrentLocation.latitude,
            longitude: userCurrentLocation.longitude,
          }}
          pinColor={'red'}
        // title='this is title'
        // description='this is discription'
        />

      </MapView>
      <View style={{ position: 'absolute', bottom: '1%', width: '100%' }}>
        <View style={{ flexDirection: 'row', }}>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => getCurrentLocation()}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Get Current Location </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Hospitals', {
              currentLat: userCurrentLocation.latitude,
              currentLng: userCurrentLocation.longitude,
            })}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Hospitals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('PoliceStation', {
              currentLat: userCurrentLocation.latitude,
              currentLng: userCurrentLocation.longitude,
            })}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Police Stations</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Parkings', {
              currentLat: userCurrentLocation.latitude,
              currentLng: userCurrentLocation.longitude,
            })}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> Parkings </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('FireBrigade', {
              currentLat: userCurrentLocation.latitude,
              currentLng: userCurrentLocation.longitude,
            })}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Fire Birgades</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> Add </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default GoogleMapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: '100%',
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // position: 'absolute',
    // height : '100%',
    // width : '100%',
    // top:'10%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: '97%',
    width: '100%',
  },
  btn: {
    flex: 1,
    // width: '48%',
    marginHorizontal: 3,
    // borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: '#12768c',
  },
})

