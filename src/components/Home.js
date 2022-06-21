import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeTab from '../tabs/HomeTab'
import BooksTab from '../tabs/BooksTab'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import { BOOKS_LIST } from '../redux/types/types'
import ImgBackground from '../resources/imgs/background_rn.jpg'
import ImgLogo from '../resources/imgs/book_img.png'
import SearchTab from '../tabs/SearchTab'

const Tab = createNativeStackNavigator()

export default function Home({navigation}) {

  const [loginstatustester, setloginstatustester] = useState(false);

  return (
    <View style={styles.mainView}>
        <View style={styles.viewNavBar}>
          <View style={styles.navBarFlex}>
            <View style={styles.logoFlexBar}>
              <Image source={ImgLogo} style={styles.logoNavBarIcon} />
              <Text style={styles.textIconLabelBar}>Coder's Library</Text>
            </View>
            {loginstatustester? (
              <View style={styles.viewNavigationsBar}>
                <IconIon name='ios-notifications' size={30} color="#4d4d4d" style={styles.iconsNavBarList} />
                <View style={styles.viewAccountIcon}>
                  <View style={styles.flexAccountIcon}>
                    <IconIon name='person-circle-outline' size={35} color="#4d4d4d" style={styles.accountIcon} />
                    <Text numberOfLines={1} style={styles.userLabelName}>Abdul Kalameshinti</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.viewNavigationsBar}>
                <IconIon name='help-circle-outline' size={35} color="#4d4d4d" style={styles.iconsNavBarList} />
                <View style={styles.viewAccountIcon}>
                  <View style={styles.flexSignUpIcon}>
                    <Text style={styles.userSignUp}>Sign Up | Sign In</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.scrollViewStyling}>
            <Tab.Navigator screenOptions={{gestureEnabled: true, animation: "slide_from_right"}}>
              <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}} />
              <Tab.Screen name="SearchTab" component={SearchTab} options={{headerShown: false}} />
              <Tab.Screen name="BooksTab" component={BooksTab} options={{headerShown: false}} />
            </Tab.Navigator>
        </View>
        <View style={styles.viewNav}>
          <Icon name='home' size={25} color="grey" style={styles.iconsStyling} onPress={() => {navigation.navigate("HomeTab")}} />
          <Icon name='search' size={25} color="grey" style={styles.iconsStyling} onPress={() => {navigation.navigate("SearchTab")}} />
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
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    viewNavBar:{
      height: 60,
      backgroundColor: "white",
      paddingTop: 0,
      width: "100%",
      borderBottomWidth: 1,
      borderColor: "#bfbfbf",
      elevation: 3
    },
    navBarFlex:{
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      flexDirection: "row"
    }, 
    logoFlexBar:{
      backgroundColor: "white",
      width: "50%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    logoNavBarIcon:{
      width: 30,
      height: 30,
      marginLeft: 15,
      marginRight: 10
    },
    textIconLabelBar:{
      fontSize: 17,
      color: "black"
    },
    viewNavigationsBar:{
      width: "50%",
      backgroundColor: "white",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    accountIcon:{
      marginRight: 0
    },
    viewAccountIcon:{
      borderWidth: 1,
      borderColor: "grey",
      marginRight: 5,
      width: 100,
      height: 40,
      borderRadius: 20
    },
    flexAccountIcon:{
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    flexSignUpIcon:{
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    userLabelName:{
      backgroundColor: "white",
      width: 55,
      color: "#4d4d4d"
    },
    userSignUp:{
      width: 100,
      fontSize: 13,
      textAlign: "center",
      backgroundColor: "transparent"
    },
    iconsNavBarList:{
      margin: 5,
      marginTop: 5
    },  
    scrollViewStyling:{
      backgroundColor: "white",
      width: "100%",
      height: "100%"
    },
    scrollViewContainer:{
      flex: 0,
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