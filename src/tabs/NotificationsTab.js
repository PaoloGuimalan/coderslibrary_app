import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { SET_DOWNLOADS, SET_NOTIFICATIONS, SET_SAVES } from '../redux/types/types';
import SavesTab from './profileTabs/SavesTab';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const NotificationsTab = ({navigation}) => {

  const [loadingState, setloadingState] = useState(true);
  const [NoNetwork, setNoNetwork] = useState(false);

  const notifications = useSelector(state => state.notifications);
  const account = useSelector(state => state.account);
  const dispatch = useDispatch()

  useEffect(() => {
    getNotifications()

    return () => {
      dispatch({type: SET_NOTIFICATIONS, notifications: []})
    }
  },[])

  const getNotifications = async () => {
    setloadingState(true);
    setNoNetwork(false)
    if(account.status){
      await AsyncStorage.getItem('token').then((resp) => {
        Axios.get('https://coderslibraryserver.herokuapp.com/getNotifications', {
          headers:{
            "x-access-token": resp
          }
        }).then((response) => {
          //dispatch response
          dispatch({type: SET_NOTIFICATIONS, notifications: response.data})
          setloadingState(false)
        }).catch((err) => {
          //alert error
          setloadingState(false);
          setNoNetwork(true);
        })
      })
    }
    else{
      setloadingState(false)
    }
  }

  const gotoBook = async (bookIDNotif) => {
      await AsyncStorage.getItem('token').then((resp) => {
          Axios.get(`https://coderslibraryserver.herokuapp.com/getBookInfo/${bookIDNotif}/${account.status? account.userName : null}`, {
              headers: {
                  "x-access-token": resp
              }
          }).then((response) => {
            if(Platform.OS === 'android'){
              ToastAndroid.show(`Redirecting to ${response.data.bookInfo.name}`, ToastAndroid.SHORT)
            }
            else{
                alert(`Redirecting to ${response.data.bookInfo.name}`)
            }
              navigation.navigate("ViewBook", { url: response.data.bookInfo.link_dl, bookID: response.data.bookInfo.id })
          }).catch((err) => {
              if(Platform.OS === 'android'){
                  ToastAndroid.show("Cannot Access Book", ToastAndroid.SHORT)
              }
              else{
                  alert("Cannot Access Book")
              }
          })
      })
  }
  
  return (
    <View style={styles.mainView}>
        <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        <View style={styles.viewLabelsWRefresh}>
            <Text style={styles.mainLabel}>Notifications</Text>
            <TouchableOpacity onPress={() => { getNotifications() }}>
                <IconIon name='reload' size={20} />
            </TouchableOpacity>
        </View>
          {loadingState? (
            <Animatable.View animation="rotate" duration={1000} delay={100} iterationDelay={0} iterationCount="infinite" easing="ease-out" style={styles.viewNoSearchDisplay}>
              <View style={styles.viewFlexedNoSearch}>
                <IconAntDesign name='loading1' size={30} />
              </View>
            </Animatable.View>
          ) : (
            NoNetwork? (
              <View style={styles.viewNoSearchDisplay}>
                <View style={styles.viewFlexedNoSearch}>
                  <IconFeather name='wifi-off' size={80} />
                  <Text style={styles.textLabelNoSearch}>No Network</Text>
                  <TouchableOpacity onPress={() => { getNotifications() }}>
                    <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              notifications.length == 0? (
                <View style={styles.viewNoSearchDisplay}>
                  <View style={styles.viewFlexedNoSearch}>
                    <IconIon name='notifications-off-outline' size={80} />
                    <Text style={styles.textLabelNoSearch}>Notifications Empty.</Text>
                    <TouchableOpacity onPress={() => { getNotifications() }}>
                      <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Reload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.viewRecents}>
                <View style={styles.flexedRecents}>
                {notifications.map((items, i) => {
                  return(
                    <TouchableOpacity onPress={() => { gotoBook(items.linking) }} key={i} disabled={false} style={{width: "100%", maxWidth: 600, alignItems: "center"}}>
                      <View style={{backgroundColor: "#f2f2f2", borderRadius: 5, paddingTop: 10, borderBottomWidth: 1, borderBottomColor: "#acacac", width: "90%", minHeight: 70, marginBottom: 5}}>
                        <View style={{flex: 1, backgroundColor: "transparent", flexDirection: "row", alignItems: "center"}}>
                          <IconMCI name='comment-outline' size={50} />
                          <View style={{width: "80%", backgroundColor: "transparent", alignItems: "center", paddingLeft: 10, marginBottom: 5}}>
                            <Text style={{width: "100%", marginLeft: 0, fontSize: 17, fontWeight: "bold", marginBottom: 0}}>You were tagged</Text>
                            <Text style={{width: "100%", marginLeft: 0, fontSize: 15, marginBottom: 5, marginTop: 5, textDecorationLine: "underline"}}>Book ID: {items.linking}</Text>
                            <Text style={{textAlign: "justify", marginBottom: 10, fontSize: 15}}>{items.content}</Text>
                            <Text style={{width: "100%", marginLeft: 0, fontSize: 13, color: "#acacac"}}>{items.date} | {items.time}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
                </View>
              </View>
              )
            )
          )}
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  mainView:{
      width: "100%",
      backgroundColor: "white",
      flexGrow: 1
  },
  mainLabel:{
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  },
  viewRecents:{
    backgroundColor: "white",
    flex: 0,
    width: "100%"
  },
  flexedRecents:{
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  imgSizing:{
    width: 150,
    height: 200,
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  recentsIndvView:{
    margin: 5,
    backgroundColor: "#a3a3a3",
    height: 280,
    borderWidth: 0,
    borderColor: "grey",
    borderRadius: 5
  },
  bookName:{
    width: 130,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
    height: 40
  },
  viewIconsNav:{
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  viewIconTouch:{
    backgroundColor: "transparent",
    width: 100,
    height: 35,
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  viewIconTouchSaves:{
      backgroundColor: "transparent",
      width: 50,
      height: 35,
      justifyContent: "space-evenly",
      alignItems: "center",
      flex: 1,
      flexDirection: "row"
    },
  openTextBook:{
    textAlignVertical: "center",
    marginBottom: 3
  },
  viewNoSearchDisplay:{
    borderWidth: 0,
    width: 150,
    height: 150,
    marginTop: 50,
    alignSelf: "center"
  },
  viewFlexedNoSearch:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  viewLabelsWRefresh:{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20
  }
})

export default NotificationsTab