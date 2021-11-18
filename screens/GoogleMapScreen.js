import React, { useState,useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
const GoogleMapScreen = () => {
    const [lat, setLat] = useState(37.78825);
    const [lng, setLng] = useState(-122.4324);
  useEffect(() => {
    Geolocation.getCurrentPosition((info)=>{
        setLat(info.coords.latitude);setLng(info.coords.longitude)
        // console.log(info.coords.latitude);
    });
  }, [])
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
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        
        // latitude: 37.78825,
        // longitude: -122.4324,

        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    showsMyLocationButton={true}
    >
         <Marker
    //   key={index}
      coordinate={{
          latitude:lat,
          longitude:lng
      }}
    //   title={marker.title}
    //   description={marker.description}
    />

    </MapView>
  </View>
  );
}

export default GoogleMapScreen;

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        // height: '100%',
        // width: 400,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        position: 'absolute',
        height : '100%',
        width : '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      }
})

