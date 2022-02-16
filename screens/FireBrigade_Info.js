import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TextInput, TouchableOpacity, RefreshControl,ToastAndroid, StatusBar, LogBox, FlatList, Linking, ActivityIndicator } from 'react-native';
import { getDistance, findNearest } from 'geolib';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const FireBrigade_Info = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isFetch, setIsFetch] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      getAllFireBrigade();
    }, [])
    const getAllFireBrigade=()=>{
        setLoading(true);
        // var InsertApiURL = `http://${ip}/RescueAgencyApi/api/Hospitals/GetHospitalsInfo`;
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/FireBrigade/GetFireBrigadeInfo`;
        fetch(InsertApiURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                setData([]);
                if (response.length > 0) {
                    response.forEach(element => {
                        setData(data => [...data, {
                            Id: element.Id,
                            Name: element.Name,
                            Address: element.Address,
                            lat: element.lat,
                            lng: element.lng,
                        }]);
                    });

                } else {
                    alert('No record found...')
                }
            })
            .catch((error) => {
                alert(error);
            }).finally(() =>{ setIsFetch(false);setLoading(false)});
    }
    const deleteRecord = (id) => {
        console.log('delete record id', id);
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/FireBrigade/DeleteFireBrigade?id=${id}`;//AddOrEditFireBrigade
        fetch(InsertApiURL,
            {
                method: 'GET',
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

    return (
        <View style={styles.container}>

            {
                isFetch == true ? (
                    <View>
                        <ActivityIndicator size={'large'} color={'red'} />
                    </View>
                ) : (
                    <View style={{ flex: 1, backgroundColor: 'green' }}>


                        {/* <View style={{ backgroundColor: '#f3f', position: 'absolute', bottom: '10%', left: 100 }}> */}
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditFireBrigade_Info', {
                                Id: '0',
                                Name: '',
                                Address: '',
                                lat: '',
                                lng: ''
                            })
                        }}
                            style={{ zIndex: 1, height: 60, width: 60, borderRadius: 60, backgroundColor: 'red', backgroundColor: 'red', position: 'absolute', bottom: '5%', right: '5%', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="add" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                        <FlatList showsVerticalScrollIndicator={false}
                            data={data}
                            refreshControl={
                                <RefreshControl
                                  onRefresh={() => getAllFireBrigade()}
                                  refreshing={loading}
                                  tintColor="red"
                                  colors={["red", "green"]}
                                />
                            }
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return <View style={styles.card}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name : {item.Name}</Text>
                                    <Text style={{ fontSize: 20, }}>Address : {item.Address}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: '800' }}>lat: {item.lat}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: '800' }}>lng: {item.lng}</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.button}
                                            onPress={() => {
                                                navigation.navigate('EditFireBrigade_Info', {
                                                    Id: item.Id,
                                                    Name: item.Name,
                                                    Address: item.Address,
                                                    lat: item.lat,
                                                    lng: item.lng
                                                })
                                            }}
                                        >
                                            <Text style={styles.buttonText}> Edit </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => deleteRecord(item.Id)}>
                                            <Text style={styles.buttonText}> Delete </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            }
                        />
                    </View>

                )
            }

        </View>
    );
}

export default FireBrigade_Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#778888',
        padding: 15,
        marginBottom: 3,
        //    borderBottomColor:'red',
        //    borderBottomWidth:1,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        width: 250,
        borderWidth: 1,
        padding: 10,
    },

})

