import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geocoder from 'react-native-geocoder';

const EditPoliceStation_Info = ({ navigation, route }) => {
    const [id, setId] = useState(route.params.Id);
    const [name, setName] = useState(route.params.Name);
    const [address, setAddress] = useState(route.params.Address);
    const [lat, setLat] = useState(route.params.lat.toString());
    const [lng, setLng] = useState(route.params.lng.toString());
    const [changeEnable, setChangeEnable] = useState(false);
    const [userCurrentLocation, setUserCurrentLocation] = useState({
        latitude: route.params.lat.toString().length > 0 ? route.params.lat : 33.64138731315475,
        longitude: route.params.lng.toString().length > 0 ? route.params.lng : 73.07977021488884,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0043,
    });
    const getAddressFromLatLng = () => {
        console.log(changeEnable.toString());
        if (changeEnable) {
            var NY = {
                lat: userCurrentLocation.latitude,
                lng: userCurrentLocation.longitude
            };
            console.log(NY);
            Geocoder.geocodePosition(NY).then(res => {
                setAddress(res[0].formattedAddress)
                setLat(userCurrentLocation.latitude)
                setLng(userCurrentLocation.longitude);
                // navigation.navigate('Edit', {
                //     Id: route.params.Id,
                //     Name: route.params.Name,
                //     Address: res[0].formattedAddress,
                //     lat: userCurrentLocation.latitude,
                //     lng: userCurrentLocation.longitude,
                // })
            })
                .catch(err => {
                    let errorMsg = "Error in geoCoder" + err;
                    alert(err);
                    // ToastAndroid.show(errorMsg, ToastAndroid.LONG);
                })
        } else {
            console.log('not');
            setChangeEnable(true);
        }
    }

    const saveData = () => {
        if (name.length == 0) {
            alert('Please Enter Name')
        } else if (address.length == 0) {
            alert('Please Enter Address')
        } else if (lat.length == 0) {
            alert('Please Enter Latitude')
        } else if (lng.length == 0) {
            alert('Please Enter Longitude')
        } else {
            console.log(id, name, address, lat, lng);
            var InsertApiURL = `http://${ip}/RescueAgencyApi/api/PoliceStation/AddOrEditPoliceStation`;
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            var Data = {
                Id: id,
                Name: name,
                Address: address,
                lat:lat,
                lng:lng,
            }
            fetch(InsertApiURL,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data)
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                   alert(response);
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.txt}> Name</Text>
                <TextInput style={styles.input}
                    value={name}
                    placeholder={'Name'}
                    multiline={true}
                    onChangeText={(txt) => setName(txt)}
                />

                <Text style={styles.txt}> Address </Text>
                <TextInput style={styles.input}
                    placeholder={'Address'}
                    multiline={true}
                    onChangeText={(txt) => setAddress(txt)}
                    value={address}
                />

                <Text style={styles.txt}> Lat</Text>
                <TextInput style={styles.input}
                    placeholder={'Lat'}
                    onChangeText={(txt) => setLat(txt)}
                    value={lat.toString()}
                />

                <Text style={styles.txt}> Lng</Text>
                <TextInput style={styles.input}
                    placeholder={'Lng'}
                    onChangeText={(txt) => setLng(txt)}
                    value={lng.toString()}
                />
                <View style={{ height: 300 }}>
                    <View style={{ ...StyleSheet.absoluteFillObject, }}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            // style={styles.map}
                            style={styles.container}
                            // showsUserLocation={true}
                            showsMyLocationButton={true}
                            initialRegion={{
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
                                    }),
                                        // console.log('change'),
                                        getAddressFromLatLng()
                                    // setChangeEnable(true)

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
                    </View>
                </View>


                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity style={styles.button} onPress={() => saveData()}>
                        <Text style={styles.buttonText}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default EditPoliceStation_Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    button: {
        backgroundColor: '#1bb',
        flex: 1,
        height: 50,
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        borderRadius: 7,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actionButtonIcon: {
        fontSize: 28,
        // height: 22,
        color: 'white',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    txt: {
        fontSize: 24,
        textAlign: "left"
    },
    input: {
        margin: 12,
        width: '90%',
        borderWidth: 1,
        padding: 10,
    },
    btnAddBoard: {
        width: "98%",
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#f44336',
    },

})

