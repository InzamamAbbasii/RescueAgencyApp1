import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TextInput, TouchableOpacity, RefreshControl, ToastAndroid, StatusBar, LogBox, FlatList, Linking, ActivityIndicator } from 'react-native';
import { getDistance, findNearest } from 'geolib';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
const Hospitals_Info = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isFetch, setIsFetch] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        getAllHospitals();
    }, [])
    const getAllHospitals = () => {
        setLoading(true);
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/Hospitals/GetHospitalsInfo`;
        fetch(InsertApiURL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                setData([]);setFilterData([]);
                if (response.length > 0) {
                    response.forEach(element => {
                        setData(data => [...data, {
                            Id: element.Id,
                            Name: element.Name,
                            Address: element.Address,
                            lat: element.lat,
                            lng: element.lng,
                        }]);
                        setFilterData(data => [...data, {
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
            }).finally(() => { setIsFetch(false); setLoading(false) });
    }
    // const makeCall=()=>{
    //     Linking.openURL(`tel:03449154158`);
    // }
    const ShowModal = (name,) => {
        console.log(name, ',');
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <TextInput style={styles.input}
                                value={name.name}
                                placeholder={'Name'}
                                onChangeText={(txt) => setName(txt)}
                            />
                            <TextInput style={styles.input}
                                placeholder={'Address'}
                                onChangeText={(txt) => setAddress(txt)}
                                value={address}
                            />
                            <TextInput style={styles.input}
                                placeholder={'Lat'}
                                onChangeText={(txt) => setLat(txt)}
                                value={lat}
                            />
                            <TextInput style={styles.input}
                                placeholder={'Lng'}
                                onChangeText={(txt) => setLng(txt)}
                                value={lng}
                            />
                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}> Save </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.buttonText}> Cancel </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    const deleteRecord = (id) => {
        console.log('delete record id', id);
        var InsertApiURL = `http://${ip}/RescueAgencyApi/api/Hospitals/DeleteHospital?id=${id}`;
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

    const searchByName = (text) => {
        console.log("text: ", text);
        if (text) {
            let newData = filterData.filter(function (item) {
                return item.Name.toString().includes(text);
            });
            setFilterData(newData);
            setSearchText(text);
        }else{
            setFilterData(data);
            setSearchText(text);
        }
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

                            <View style={{ backgroundColor: 'pink', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>
                                <TextInput style={{ borderWidth: 1, flex: 1, height: 40, marginRight: 5, paddingLeft: 10, backgroundColor: '#fff', color: '#000' }}
                                    value={searchText}
                                    onChangeText={(text) => {setSearchText(text);searchByName(text)}}
                                    placeholder='Search here..'
                                />
                                <TouchableOpacity  onPress={()=>searchByName(searchText)}
                                style={{ width: 70, backgroundColor: '#000', height: 40, justifyContent: 'center', borderRadius: 7 }}>
                                    <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}> Search </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ backgroundColor: '#f3f', position: 'absolute', bottom: '10%', left: 100 }}> */}
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditHospital_Info', {
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
                                data={filterData}
                                refreshControl={
                                    <RefreshControl
                                        onRefresh={() => getAllHospitals()}
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
                                                    navigation.navigate('EditHospital_Info', {
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

    export default Hospitals_Info;

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

