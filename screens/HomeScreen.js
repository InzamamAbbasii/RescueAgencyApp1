import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';

export default HomeScreen=({navigation})=>{
    return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('GoogleMapScreen')}>
               <Text style={styles.btnText}> Near By Hospital </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('GoogleMapScreen')}>
               <Text style={styles.btnText}> Near By Fire Brigade </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('GoogleMapScreen')}>
               <Text style={styles.btnText}> Near By Police Station </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('GoogleMapScreen')}>
               <Text style={styles.btnText}> Near By Parking </Text>
           </TouchableOpacity>
           
       </View>
    );
}

const styles=StyleSheet.create({
  btnTouchable:{
      backgroundColor:'#12768c',
      width:'90%',
      height:120,
      margin:5,
      borderRadius:20,
      alignItems:'center',
      justifyContent:'center',
  },
  btnText:{
     fontSize:25,
     fontWeight:'bold',
     color:'#fff',
  }
});