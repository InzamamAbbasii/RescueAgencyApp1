import React, { useState,useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps'; 
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
const GoogleMapScreen = () => {
    const [lat, setLat] = useState(33.66428361560105);
    const [lng, setLng] = useState(73.37372861072055);
  useEffect(() => {
    Geolocation.getCurrentPosition((info)=>{
        setLat(info.coords.latitude);setLng(info.coords.longitude)
        // console.log(info.coords.latitude);
    });
  }, [])

  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        
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

