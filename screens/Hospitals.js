import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar, LogBox, FlatList,Linking } from 'react-native';
import { getDistance, findNearest } from 'geolib';
const Hospitals = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    console.log(route.params);
    useEffect(() => {
        // var InsertApiURL = `http://${ip}/RescueAgencyApi/api/Hospitals/GetHospitalsInfo`;
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/Hospitals/GetNearestHospitalsInfo?lat=${route.params.currentLat}&lng=${route.params.currentLng}`;
        fetch(InsertApiURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                setData([]);
                if (response.length > 0) {
                    if (response.length <= 5) {
                        response.forEach(element => {
                            setData(data => [...data, {
                                Id: element.Id,
                                Name: element.Name,
                                Address: element.Address,
                                lat: element.lat,
                                lng: element.lng,
                                Delta: element.delta,
                            }]);
                        });
                    } else {
                        for (let index = 0; index < 5; index++) {
                            const element = response[index];
                            setData(data => [...data, {
                                Id: element.Id,
                                Name: element.Name,
                                Address: element.Address,
                                lat: element.lat,
                                lng: element.lng,
                                Delta: element.delta,
                            }]);
                        }
                    }
                } else {
                    alert('No record found...')
                }
                // var nearestHospital=0;
                // response.forEach(element => {
                //    nearestHospital= findNearest({ latitude: route.params.currentLat, longitude: route.params.currentLng }, [
                //         { latitude: element.lat, longitude: element.lng },
                //     ]); 
                // });
                // response.forEach(element => {
                //     if(nearestHospital.latitude==element.lat && nearestHospital.longitude==element.lng){
                //         console.log(nearestHospital.latitude,element.lat);
                //         setData(data => [...data, {
                //             Id: element.Id,
                //             Name: element.Name,
                //             Address: element.Address,
                //             lat: element.lat,
                //             lng: element.lng,
                //             Distance:0,
                //         }])
                //     }
                // });
            })
            .catch((error) => {
                alert(error);
            })
    }, [])
    // const makeCall=()=>{
    //     Linking.openURL(`tel:03449154158`);
    // }
    return (
        <View style={styles.container}>
            <FlatList style={{ padding: 7 }} showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name : {item.Name}</Text>
                        <Text style={{ fontSize: 20, }}>Address : {item.Address}</Text>
                        {/* <Text style={{ fontSize: 20, fontWeight: '800' }}>Lat : {item.lat} Lng: {item.lng}</Text> */}
                        <Text style={{ fontSize: 20, fontWeight: '800' }}>Delta: {item.Delta}</Text>
                        {/* <TouchableOpacity onPress={()=>makeCall()} style={{padding:10}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'blue'}}> 03449154158 </Text>
                        </TouchableOpacity> */}
                        <View style={{ width: '100%', borderBottomColor: '#000', borderWidth: 1, marginVertical: 20 }}></View>
                    </View>
                }
                }
            />
        </View>
    );
}

export default Hospitals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

})

