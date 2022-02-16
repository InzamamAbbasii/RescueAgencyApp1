import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, PermissionsAndroid, ToastAndroid, LogBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geocoder from 'react-native-geocoder';

const GoogleMapWithSearch = ({ navigation,route}) => {
    const [lat, setLat] = useState(31.31241731792987); // pakistan lat
    const [lng, setLng] = useState(69.3550318966653); //pakistan lng
    const [userCurrentLocation, setUserCurrentLocation] = useState({
        latitude: route.params.lat.toString().length>0?route.params.lat:33.64138731315475,
        longitude: route.params.lng.toString().length>0?route.params.lng:73.07977021488884,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0043,
    });
    useEffect(() => {
        LogBox.ignoreAllLogs();
        // Geolocation.getCurrentPosition((info) => {
        //   setLat(info.coords.latitude); setLng(info.coords.longitude)
        //   // console.log(info.coords.latitude);
        // });
        // getCurrentLocation();
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


    const getAddressFromLatLng = () => {
        var NY = {
            lat: userCurrentLocation.latitude,
            lng: userCurrentLocation.longitude
        };
        console.log(NY);
        Geocoder.geocodePosition(NY).then(res => {
            navigation.navigate('Edit', {
                Id: route.params.Id,
                Name: route.params.Name,
                Address: res[0].formattedAddress,
                lat: userCurrentLocation.latitude,
                lng: userCurrentLocation.longitude,
            })
        })
            .catch(err => {
                let errorMsg = "Error in geoCoder" + err;
                alert(err);
                // ToastAndroid.show(errorMsg, ToastAndroid.LONG);
            })
    }

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
            <View style={{ position: 'absolute', bottom: '2%', width: '100%', }}>
                <TouchableOpacity
                    style={styles.btn}
                    // onPress={() => { alert('Selected') }}
                    onPress={() => { getAddressFromLatLng() }}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }}> Select </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default GoogleMapWithSearch;

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
        width: '97%',
        marginHorizontal: 3,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        backgroundColor: '#12768c',
        borderRadius: 10,
    },
})

