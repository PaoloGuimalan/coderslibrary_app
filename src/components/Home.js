import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeTab from '../tabs/HomeTab'
import BooksTab from '../tabs/BooksTab'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { BOOKS_LIST, SET_ACCESSIBILITIES, SET_ACCOUNT } from '../redux/types/types'
import ImgBackground from '../resources/imgs/background_rn.jpg'
import ImgLogo from '../resources/imgs/book_img.png'
import SearchTab from '../tabs/SearchTab'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createNativeStackNavigator()

export default function Home({navigation}) {

  const [loginstatustester, setloginstatustester] = useState(false);

  const account = useSelector(state => state.account);
  const accessibilities = useSelector(state => state.accessibilities);
  const dispatch = useDispatch()

  const storageAccountCheck = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/loginVerifier', {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
        if(response.data.status){
          dispatch({type: SET_ACCOUNT, account: {...response.data}})
          setaccessibilitiesFunc()
        }
        else{
          dispatch({type: SET_ACCOUNT, account: {status: false, token: null, userName: null}})
          setaccessibilitiesFunc()
        }
      }).catch((err) => {
        //dispatch error
        dispatch({type: SET_ACCOUNT, account: {status: false, token: null, userName: null}})
        setaccessibilitiesFunc()
      })
      // console.log(resp);
    })
  }

  const setaccessibilitiesFunc = () => {
    dispatch({type: SET_ACCESSIBILITIES, accessibilities: false})
  }

  useEffect(() => {
    storageAccountCheck()
  }, [])

  return (
    <View style={styles.mainView}>
        <View style={styles.viewNavBar}>
          <View style={styles.navBarFlex}>
            <View style={styles.logoFlexBar}>
              <Image source={ImgLogo} style={styles.logoNavBarIcon} />
              <Text style={styles.textIconLabelBar}>Coder's Library</Text>
            </View>
            {account.status? (
              <View style={styles.viewNavigationsBar}>
                <IconIon name='ios-notifications' size={30} color="#4d4d4d" style={styles.iconsNavBarList} />
                <TouchableOpacity onPress={() => { navigation.navigate("Profile", {userName: account.userName}) }} disabled={accessibilities}>
                  <View style={styles.viewAccountIcon}>
                    <View style={styles.flexAccountIcon}>
                      <IconIon name='person-circle-outline' size={35} color="#4d4d4d" style={styles.accountIcon} />
                      <Text numberOfLines={1} style={styles.userLabelName}>{account.userName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.viewNavigationsBar}>
                <IconIon name='help-circle-outline' size={35} color="#4d4d4d" style={styles.iconsNavBarList} />
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }} disabled={accessibilities}>
                  <View style={styles.viewAccountIcon}>
                    <View style={styles.flexSignUpIcon}>
                      <Text style={styles.userSignUp}>Sign Up | Log In</Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
          <TouchableOpacity onPress={() => {navigation.navigate("HomeTab")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='home' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("SearchTab")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='search' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("BooksTab")}}>
            <View style={styles.viewButtonMain}>
             <Icon name='book' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.viewButtonMain}>
              <Icon name='bookmark' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.viewButtonMain}>
              <Icon name='gear' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
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
      flex: 0,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: "transparent"
    },
    homeLabel:{
      fontSize: 20,
      margin: 10,
      marginTop: 15,
      color: "black",
      fontWeight: "700"
    },
    viewButtonMain:{
      backgroundColor: "transparent",
      height: "100%",
      flex: 1,
      justifyContent: "center",
      marginLeft: 1,
      marginRight: 1
    }
})