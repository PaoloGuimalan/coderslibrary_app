import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconFeather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ACCOUNT, SET_PROFILE } from '../redux/types/types'
import Axios from 'axios'

const Profile = ({route, navigation: { goBack, navigate }}) => {

  const dispatch = useDispatch()
  const account = useSelector(state => state.account);
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    // console.log(route)
    fetchRecents()
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/userProfileDetails', {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
        dispatch({type: SET_PROFILE, profile: response.data})
      }).catch((err) => {
        //dispatch state error
      })
    })
  }

  const fetchRecents = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/userRecentsList', {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
      }).catch((err) => {
        //dispatch state error
      })
    })
  }

  const logoutTrigger = () => {
    // alert("Logout")
    AsyncStorage.removeItem('token').then(() => {
      dispatch({type: SET_ACCOUNT, account: {
          status: false,
          token: null,
          userName: null
      }})
      navigate("Home")
    })
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.navBar}>
        <View style={styles.flexBar}>
          <TouchableOpacity onPress={() => { goBack() }}>
            <View style={styles.viewBackButton}>
                <IconIon name='ios-chevron-back-outline' size={25} />
                <Text>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.flexViewMiddleBar}>
            <Text style={styles.screenMainLabel}>Profile</Text>
          </View>
          <TouchableOpacity onPress={() => { logoutTrigger() }}>
            <View style={styles.viewBackButton}>
                <Text style={styles.textLabelLogout}>Logout</Text>
                <IconIon name='log-out-outline' size={25} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollViewSizing} contentContainerStyle={styles.scrollViewFlex}>
        <View style={styles.viewProfileMain}>
          <View style={styles.flexViewProfileMain}>
            <IconIon name='person-circle-outline' size={100} color="#4d4d4d" />
            <View>
              <Text numberOfLines={1} style={styles.textFullName}>{profile.firstName} {profile.lastName}</Text>
              <Text style={styles.textUserName}>@{profile.userName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewCountDetails}>
          <View style={styles.viewCountDetailsFlex}>
            <TouchableOpacity>
              <View style={styles.indivCountDetails}>
                <IconMCI name='history' size={30} />
                <Text style={styles.textCountsDetails}>Recents</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.indivCountDetails}>
                <IconIon name='pricetags-outline' size={26} />
                <Text style={styles.textCountsDetails}>Tags</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.indivCountDetails}>
                <IconIon name='heart' size={27} />
                <Text style={styles.textCountsDetails}>Saves</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.indivCountDetails}>
                <IconFeather name='download' size={30} />
                <Text style={styles.textCountsDetails}>Downloads</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.indivCountDetails}>
                <IconEnt name='dots-three-horizontal' size={30} />
                <Text style={styles.textCountsDetails}>Infos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    navBar:{
        backgroundColor: "white",
        width: "100%",
        height: 50,
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#bfbfbf"
    },
    flexBar:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    viewBackButton:{
        backgroundColor: "white",
        width: 80,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    textLabelLogout:{
      marginRight: 5,
      color: "red"
    },
    flexViewMiddleBar:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    screenMainLabel:{
      fontSize: 17,
      fontWeight: "bold"
    },
    scrollViewFlex:{
      flexGrow: 1,
      backgroundColor: "green",
      alignItems: "center"
    },
    scrollViewSizing:{
      width: "100%"
    },
    viewProfileMain:{
      backgroundColor: "white",
      width: "100%",
      height: 150
    },
    flexViewProfileMain:{
      backgroundColor: "white",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row"
    },
    textFullName:{
      fontSize: 25,
      fontWeight: "bold"
    },
    textUserName:{
      fontSize: 15
    },
    viewCountDetails:{
      backgroundColor: "white",
      borderColor: "#bfbfbf",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 60,
      width: "100%"
    },
    viewCountDetailsFlex:{
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row"
    },
    indivCountDetails:{
      margin: 2,
      borderWidth: 0,
      alignItems: 'center',
      width: 60
    },
    textCountsDetails:{
      fontSize: 13
    }
})

export default Profile