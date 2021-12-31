import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar, LogBox, FlatList } from 'react-native';
import { getDistance,findNearest } from 'geolib';
const FireBrigade = ({ navigation,route }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/FireBrigade/GetFireBrigadeInfo`;
        fetch(InsertApiURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                setData([]);
                var nearestHospital=0;
                response.forEach(element => {
                   nearestHospital= findNearest({ latitude: route.params.currentLat, longitude: route.params.currentLng }, [
                        { latitude: element.lat, longitude: element.lng },
                    ]); 
                });
                response.forEach(element => {
                    if(nearestHospital.latitude==element.lat && nearestHospital.longitude==element.lng){
                        console.log(nearestHospital.latitude,element.lat);
                        setData(data => [...data, {
                            Id: element.Id,
                            Name: element.Name,
                            Address: element.Address,
                            lat: element.lat,
                            lng: element.lng,
                            Distance:0,
                        }])
                    }
                });
            })
            .catch((error) => {
                alert(error);
            })
    }, [])
    return (
        <View style={styles.container}>
            <FlatList style={{ padding: 7 }}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return <View>
                        <Text style={{ fontSize: 20,fontWeight:'bold' }}>Name : {item.Name}</Text>
                        <Text style={{ fontSize: 20, }}>Address : {item.Address}</Text>
                        <Text style={{ fontSize: 20,fontWeight:'800' }}>Lat : {item.lat} Lng: {item.lng}</Text>
                        <View style={{width:'100%',borderBottomColor:'#000',borderWidth:1,marginTop:10}}></View>
                        </View>
                }
                }
            />
        </View>
    );
}

export default FireBrigade;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:10,
    },

})

