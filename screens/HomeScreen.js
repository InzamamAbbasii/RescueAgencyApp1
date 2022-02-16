import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';

export default HomeScreen=({navigation})=>{
    return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('Hospitals_Info')}>
               <Text style={styles.btnText}> Hospital </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('FireBrigade_Info')}>
               <Text style={styles.btnText}>  Fire Brigade </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('PoliceStation_Info')}>
               <Text style={styles.btnText}> Police Station </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnTouchable}
           onPress={()=>navigation.navigate('Parking_Info')}>
               <Text style={styles.btnText}> Parking </Text>
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