import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//SignUp Screen Code-------
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");

  const InsertRecord = () => {
    if (name.length == 0 || email.length == 0 || password.length == 0 || confirmPassword.length == 0) {
      alert("Required Field is missing!");
    } else if (password != confirmPassword) {
      alert("Password and Confirm Password does not match!");
    } else {
      //Api Code goes here
      var InsertApiURL = "http://192.168.1.104/RescueAgencyApi/api/user/RegisterUser";
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        Username: name,
        Email: email,
        Phone:phone,
        Password: password,
      }
   console.log(Data);
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
          // ToastAndroid.show(response, ToastAndroid.LONG);
        })
        .catch((error) => {
          let errorMsg = error;
          console.log(error);
          // ToastAndroid.show(errorMsg, ToastAndroid.LONG);

        })
    }
  }

  return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, color: '#000000', fontWeight:'bold' }}>Sign Up !</Text>
        </View>
  
          <View style={styles.textInput}>
            <Icon name='person' size={30} color='#000' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="UserName"
              placeholderTextColor="#3228"
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={styles.textInput}>
            <Icon name='email' size={30} color='#000' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Email."
              placeholderTextColor="#3228"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={styles.textInput}>
            <Icon name='phone' size={30} color='#000' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="Phone No"
              placeholderTextColor="#3228"
              onChangeText={(ph) => setPhone(ph)}
            />
          </View>
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
          <View style={styles.textInput}>
            <Icon name='lock' size={30} color='#000' />
            <TextInput
              style={{ padding: 5, fontSize: 18, width: '85%' }}
              placeholder="ConfirmPassword"
              placeholderTextColor="#3228"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            />
          </View>

          <TouchableOpacity style={styles.btnSignUp}
          onPress={()=>InsertRecord()}
         >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>SignUp</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, margin: 7, alignSelf: 'center', fontWeight: 'bold', color: '#000' }}> OR </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, color: 'black' }} >  Already have an account? </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }} onPress={() => navigation.navigate("LoginScreen")}>Login </Text>
          </View>
      </ScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:'#12768c',
  },
  header: {
    height: 180,
    alignItems: 'center',
    justifyContent:'center',
    // backgroundColor:'#000',
    // borderBottomRightRadius:130,
    marginBottom:40,
  },
  textInput: {
    margin: 7,
    // marginBottom:5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth:1.5,
    borderColor:'#000',
    borderRadius: 40,
    padding: 5,
    paddingLeft: 15,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 40,
    elevation: 6,
  },
  btnSignUp: {
    width: "95%",
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#000',
  },
  btnLogin: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1
  },
})