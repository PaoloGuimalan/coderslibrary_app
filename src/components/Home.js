import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import IconFeather from 'react-native-vector-icons/Feather'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeTab from '../tabs/HomeTab'
import BooksTab from '../tabs/BooksTab'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { BOOKS_LIST } from '../redux/types/types'
import ImgBackground from '../resources/imgs/background_rn.jpg'

const Tab = createNativeStackNavigator()

export default function Home({navigation}) {

  return (
    <View style={styles.mainView}>
        <View style={styles.scrollViewStyling}>
            <Tab.Navigator>
              <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}} />
              <Tab.Screen name="BooksTab" component={BooksTab} options={{headerShown: false}} />
            </Tab.Navigator>
        </View>
        <View style={styles.viewNav}>
          <Icon name='home' size={25} color="grey" style={styles.iconsStyling} onPress={() => {navigation.navigate("HomeTab")}} />
          <Icon name='search' size={25} color="grey" style={styles.iconsStyling} />
          <Icon name='book' size={25} color="grey" style={styles.iconsStyling} onPress={() => {navigation.navigate("BooksTab")}} />
          <Icon name='bookmark' size={25} color="grey" style={styles.iconsStyling} />
          <Icon name='gear' size={25} color="grey" style={styles.iconsStyling} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    scrollViewStyling:{
      backgroundColor: "white",
      width: "100%",
      height: "100%"
    },
    scrollViewContainer:{
      flex: 1,
      alignItems: 'center'
    },
    viewNav:{
      height: 55,
      width: "70%",
      maxWidth: 250,
      flex: 1,
      alignItems: "center",
      position: "absolute",
      backgroundColor: "white",
      bottom: 20,
      borderRadius: 55,
      justifyContent: "center",
      flexDirection: "row",
      borderColor: "grey",
      borderWidth: 1.5
    },
    iconsStyling:{
      marginLeft: 10,
      marginRight: 10
    },
    homeLabel:{
      fontSize: 20,
      margin: 10,
      marginTop: 15,
      color: "black",
      fontWeight: "700"
    }
})