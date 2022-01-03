import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, StatusBar, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Login Screen Code
const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, [])

  const loginHandle = () => {
    if (name.length == 0) {
      alert("Please enter your name!");
    }
    else if (password.length == 0) {
      alert("Please enter your password!");
    } else {
      var InsertApiURL = `http://${ip}/RescueAgencyApi/api/user/Login?name=${name}&Password=${password}`;
      fetch(InsertApiURL, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.includes('Invalid username or password')) {
            alert(response);
          } else {
            //TODO:this is method is written in App.js file we only call it here..
            // signIn(response);
            // navigation.navigate("HomeScreen") 
            navigation.navigate("GoogleMapScreen")
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        })
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#12768c'} />
      <View style={styles.header}>
        <Text style={{ fontSize: 32, color: '#000000', fontWeight: 'bold' }}>Login!</Text>
      </View>
      <View style={styles.form}>
        {/* <Text style={{fontSize:20,marginLeft:10}}>UserName</Text> */}
        <View style={styles.textInput}>
          <Icon name='person' size={30} color='#000' />
          <TextInput
            style={{ padding: 5, fontSize: 18, width: '85%' }}
            placeholder="UserName"
            placeholderTextColor="#3228"
            onChangeText={(name) => setName(name)}
          />
        </View>
        {/* <Text style={{fontSize:20,marginLeft:10}}>Password</Text> */}
        <View style={styles.textInput}>
          <Icon name='lock' size={30} color='#000' />
          <TextInput
            style={{ padding: 5, fontSize: 18, width: '85%' }}
            placeholder="Password"
            placeholderTextColor="#3228"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        {/* <View style={styles.textInput}> */}
        <TouchableOpacity
          style={styles.btnLogin}
          // onPress={()=>{LoginUser()}}
          onPress={() => { loginHandle() }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Login</Text>
        </TouchableOpacity>
        {/* </View> */}

        <Text style={{ fontSize: 20, margin: 14, alignSelf: 'center', fontWeight: 'bold', color: '#000' }}> OR </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, color: 'black' }} >  Don't have an account? </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} onPress={() => navigation.navigate("SignUpScreen")}>SignUp </Text>
        </View>
      </View>

    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#12768c',
    // justifyContent: 'center'
  },
  header: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#000',
    // borderBottomRightRadius:130,
    marginBottom: 40,
  },
  textInput: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  btnSignUp: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1
  },
  btnLogin: {
    width: "95%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#000',
  },
})

