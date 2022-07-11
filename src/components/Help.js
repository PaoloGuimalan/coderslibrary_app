import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import ImgLogo from '../resources/imgs/book_img.png'

const Help = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.containerScrollViewStyle}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
            <View style={styles.viewIcon}>
            <View style={styles.viewIconFlexed}>
                <Image source={ImgLogo} style={styles.imageLogoSizing} />
                <Text style={styles.textIconSizing}>Coder's Library</Text>
            </View>
            </View>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginBottom: 5, fontWeight: "bold"}}>Help &#38; Guides</Text>
        <View style={styles.viewHelp}>
            <Text>Hello</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    viewHelp:{
        backgroundColor: "aqua",
        marginTop: 10,
        width: "95%",
        maxWidth: 700
    },
    viewIcon:{
        backgroundColor: "black",
        height: 50,
        width: 170,
        marginTop: 25,
        borderRadius: 10,
        marginBottom: 20
      },
      imageLogoSizing:{
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
      },
      viewIconFlexed:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
      textIconSizing:{
        fontSize: 17,
        marginLeft: 5,
        color: "white"
      },
      scrollViewStyle:{
        backgroundColor: "transparent",
        width: "100%"
      },
      containerScrollViewStyle:{
        flexGrow: 1,
        alignItems: "center"
      }
})

export default Help