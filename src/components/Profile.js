import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ACCOUNT } from '../redux/types/types'

const Profile = ({route, navigation: { goBack, navigate }}) => {

  const dispatch = useDispatch()
  const account = useSelector(state => state.account);

  useEffect(() => {
    // console.log(route)
  }, [])

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
      <Text>Profile | {route.params.userName}</Text>
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
        elevation: 2
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
    }
})

export default Profile