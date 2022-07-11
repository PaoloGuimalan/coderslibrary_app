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
import { SET_DOWNLOADS, SET_NOTIFICATIONS, SET_SAVES } from '../redux/types/types';
import SavesTab from './profileTabs/SavesTab';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const db = openDatabase({
    name: "coderslibrary_db"
})

const SettingsTab = () => {

  const [infoWindow, setinfoWindow] = useState(false);

  const reconfigureDataProcess = () => {
    if(Platform.OS === 'android'){
        ToastAndroid.show("Comming Soon!", ToastAndroid.SHORT)
      }
      else{
          alert("Comming Soon!")
      }
      setinfoWindow(false)
  }

  const deleteAllBooks = () => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM books`,[],
      (sqlTxn, res) => {
        if(res.rowsAffected > 0){
          if(Platform.OS === 'android'){
            ToastAndroid.show("Downloads Cleared!", ToastAndroid.SHORT)
          }
          else{
              alert("Downloads Cleared!")
          }
        }
      },
      (error) => {
        if(Platform.OS === 'android'){
          ToastAndroid.show("Error Clearing Downloads!", ToastAndroid.SHORT)
        }
        else{
            alert("Error Clearing Downloads!")
        }
      })
    })
  }

  const deleteAllBookMarks = () => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM bookmarks`,[],
      (sqlTxn, res) => {
        if(res.rowsAffected > 0){
          if(Platform.OS === 'android'){
            ToastAndroid.show("Bookmarks Cleared!", ToastAndroid.SHORT)
          }
          else{
              alert("Bookmarks Cleared!")
          }
        }
      },
      (error) => {
        if(Platform.OS === 'android'){
          ToastAndroid.show("Error Clearing Bookmarks!", ToastAndroid.SHORT)
        }
        else{
            alert("Error Clearing Bookmarks!")
        }
      })
    })
  }

  const deleteAllPrevious = () => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM bookprevious`,[],
      (sqlTxn, res) => {
        if(res.rowsAffected > 0){
          if(Platform.OS === 'android'){
            ToastAndroid.show("Book History Cleared!", ToastAndroid.SHORT)
          }
          else{
              alert("Book History Cleared!")
          }
        }
      },
      (error) => {
        if(Platform.OS === 'android'){
          ToastAndroid.show("Error Clearing History!", ToastAndroid.SHORT)
        }
        else{
            alert("Error Clearing History!")
        }
      })
    })
  }

  return (
    <View style={styles.mainView}>
        {infoWindow? (
            <View style={styles.viewDownload}>
                <View style={styles.viewDownloadDisplay}>
                    <TouchableOpacity onPress={() => { setinfoWindow(false) }} style={{position: "absolute", right: 10, top: 10}}>
                        <View style={{backgroundColor: "transparent"}}>
                            <IconIon name='close' size={20} style={{color: "white"}} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.labelDownloadDisplay} numberOfLines={1}>Reconfigure Data</Text>
                    <Text style={{color: "white", width: "90%", marginTop: 15, marginBottom: 15, textAlign: "justify"}}>This will clear you local data which will affect/clear your Downloads too. This cannot be undone one accomplished.</Text>
                    <TouchableOpacity onPress={() => { reconfigureDataProcess() }}>
                        <Text style={{backgroundColor: "orange", width: 100, height: 30, textAlign: "center", textAlignVertical: "center", color: "white", borderRadius: 5, borderWidth: 1, borderColor: "white"}}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View></View>
        )}
        <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        <View style={styles.viewLabelsWRefresh}>
            <Text style={styles.mainLabel}>Settings</Text>
        </View>
        <Text style={{fontSize: 17, marginLeft: 20, marginBottom: 10, fontWeight: "bold"}}>Data</Text>
        <View style={styles.viewRecents}>
            <View style={styles.flexedRecents}>
                <TouchableOpacity style={{width: 150, marginBottom: 10}} onPress={() => { setinfoWindow(true) }}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconMCI name='database-cog-outline' size={30} />
                            <Text style={{marginLeft: 3}}>Reconfigure Data</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 150, marginBottom: 10}}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconMCI name='progress-download' size={30} />
                            <Text style={{marginLeft: 3}}>Clear Downloads</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 150, marginBottom: 10}}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconMCI name='bookmark-remove-outline' size={30} />
                            <Text style={{marginLeft: 3}}>Clear Bookmarks</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 150, marginBottom: 10}}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconMI name='history-toggle-off' size={30} />
                            <Text style={{marginLeft: 3}}>Clear History</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <Text style={{fontSize: 17, marginLeft: 20, marginBottom: 10, fontWeight: "bold", marginTop: 20}}>Help and Services</Text>
        <View style={styles.viewRecents}>
            <View style={styles.flexedRecents}>
                <TouchableOpacity style={{width: 100, marginBottom: 10}}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconIon name='help-circle-outline' size={30} />
                            <Text style={{marginLeft: 3}}>Help</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 180, marginBottom: 10}}>
                    <View style={{backgroundColor: "transparent", width: "100%", maxWidth: 400, height: 50}}>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#bfbfbf", alignItems: "center", padding: 5, borderRadius: 5}}>
                            <IconFeather name='book-open' size={30} />
                            <Text style={{marginLeft: 5}}>Terms and Conditions</Text>
                        </View>
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
      width: "90%",
      alignSelf: "center"
    },
    flexedRecents:{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
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
    },
    viewDownload:{
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: 'center',
        opacity: 0.8
    },
    viewDownloadDisplay:{
        backgroundColor: "black",
        width: "90%",
        maxWidth: 300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingBottom: 20
    },
    labelDownloadDisplay:{
        marginTop: 10,
        marginBottom: 0,
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }
  })

export default SettingsTab