import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ToastAndroid, Platform, Alert, Linking, TextInput, NativeModules, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconFeather from 'react-native-vector-icons/Feather'
import IconOcti from 'react-native-vector-icons/Octicons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { SET_BOOK_COMMENTS, SET_BOOK_INFO, SET_BOOK_INFO_OFFLINE } from '../redux/types/types'
import { bookinfodata, bookinfoofflineState } from '../redux/actions/actions'
import ClipBoard from '@react-native-clipboard/clipboard'
import * as Animatable from 'react-native-animatable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { openDatabase } from 'react-native-sqlite-storage'
import RNFetchBlob from 'rn-fetch-blob/index'

const db = openDatabase({
  name: "coderslibrary_db"
})

const ViewBookOffline = ({route, navigation: { goBack, navigate }}) => {

  const source = { uri: `file://${route.params.url}` };

  const bookinfooffline = useSelector(state => state.bookinfooffline);
  const dispatch = useDispatch()

  const bookID = route.params.bookID;

  const [dropInfoView, setdropInfoView] = useState(true);
  const [noPages, setnoPages] = useState("");

  useEffect(() => {
    fetchBookData()

    return () => {
      dispatch({type: SET_BOOK_INFO_OFFLINE, bookinfooffline: bookinfoofflineState})
    }
  },[])

  const fetchBookData = () => {
    if(bookID != "..." && bookID != null){
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM books WHERE bookID = ?`,[bookID],
            (sqlTxn, res) => {
                // console.log(res.rows.item(0).bookID)
                if(res.rows.length == 1){
                    dispatch({type: SET_BOOK_INFO_OFFLINE, bookinfooffline: {
                      bookID: res.rows.item(0).bookID,
                      bookName: res.rows.item(0).bookName, 
                      bookPublisher: res.rows.item(0).bookPublisher, 
                      bookAuthor: res.rows.item(0).bookAuthor, 
                      bookPath: res.rows.item(0).bookPath, 
                      bookImg: res.rows.item(0).bookImg
                  }})
                }
            },
            (error) => {
                console.log(error.message)
            })
        })
    }
}

const gotoOnline = () => {
  // navigation.navigate("ViewBook", { url: items.link_dl, bookID: items.id })
  alert("Online")
}

  return (
      <View style={styles.container}>
            <View style={styles.navBarViewBook}>
                <View style={styles.navBarFlexedViewBook}>
                    <TouchableOpacity onPress={() => { goBack() }}>
                        <View style={styles.viewBackButton}>
                            <IconIon name='ios-chevron-back-outline' size={25} />
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontWeight: "bold", maxWidth: 270}}>{bookinfooffline.bookName}</Text>
                    <TouchableOpacity onPress={() => { setdropInfoView(!dropInfoView) }}>
                        <View style={styles.viewBackButton}>
                            <IconIon name={dropInfoView? 'close' : 'ios-menu'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: dropInfoView? 200 : 0, width: "100%", backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#bfbfbf", marginBottom: 0, alignItems: "center", display: dropInfoView? "flex" : "none" }}>
                <View style={{flex: 1, backgroundColor: "white", width: "100%", flexDirection: "row"}}>
                    <View style={{backgroundColor: "white", width: "40%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        {bookinfooffline.bookImg != "..."? (
                            <Image source={{uri: `file://${bookinfooffline.bookImg}`}} style={{width: 100, height: dropInfoView? 150 : 0, borderWidth: dropInfoView? 1 : 0, borderColor: "#bfbfbf"}} />
                        ) : (
                            <View style={{width: 100, height: dropInfoView? 150 : 0, borderWidth: dropInfoView? 1 : 0, borderColor: "#bfbfbf", backgroundColor: "#bfbfbf"}} >
                            </View>
                        )}
                    </View>
                    <View style={{width: "60%", justifyContent: "flex-start", paddingTop: 25, paddingRight: 10}}>
                        <View style={styles.viewNavigationButtons}>
                            <Text style={styles.textBookInfoMode}>Offline Mode</Text>
                        </View>
                        <Text style={styles.textBookInfo}>Publisher: {bookinfooffline.bookPublisher}</Text>
                        <Text style={styles.textBookInfo} numberOfLines={2}>Author/s: {bookinfooffline.bookAuthor}</Text>
                        <TouchableOpacity onPress={() => { gotoOnline() }}>
                            <View style={styles.viewTagComments}>
                              <View style={styles.flexedTagComments}>
                                <Text style={{marginLeft: 5}}>Go Online</Text>
                                <IconIon name='ios-chevron-forward-outline' size={23} />
                              </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 10}}></View>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                    setnoPages(numberOfPages)
                    // console.log(`Number of pages: ${numberOfPages} | ${filePath}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    // console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    // console.log(error);
                }}
                onPressLink={(uri) => {
                    // console.log(`Link pressed: ${uri}`);
                }}
                trustAllCerts={false}
                style={styles.pdf}/>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 0,
  },
  pdf: {
      flex:1,
      width: "100%",
      height: Dimensions.get("window").height,
  },
  navBarViewBook:{
      height: 50,
      borderBottomColor: "#bfbfbf",
      borderBottomWidth: 0,
      width: "100%",
      backgroundColor: "white",
      paddingTop: 0
  },
  navBarFlexedViewBook:{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
  },
  viewBackButton:{
      width: 50,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
  },
  viewBookInfo:{
      height: 200,
      width: "100%"
  },
  textBookInfo:{
      marginBottom: 5,
      marginLeft: 10
  },
  viewNavigationButtons:{
      backgroundColor: "white",
      height: 40,
      width: "100%"
  },
  flexedNavigationButtons:{
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: 'flex-start'
  },
  indivCountDetails:{
      margin: 2,
      borderWidth: 0,
      alignItems: 'center',
      width: 30
  },
  viewTagComments:{
      borderColor: "#bfbfbf",
      borderWidth: 1,
      padding: 5,
      marginLeft: 10,
      maxWidth: 100,
      borderRadius: 5,
      height: 35
  },
  flexedTagComments:{
      flex: 1,
      flexDirection: "row",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center"
  },
  tagsCommentsLabel:{
      fontSize: 17,
      fontWeight: "bold"
  },
  viewTagsCommentsMain:{
      width: "100%",
      height: "100%",
      alignItems: "center",
      flex: 1
  },
  viewFormTC:{
      width: "100%",
      marginTop: 5,
      alignItems: "center",
      padding: 5
  },
  scrollViewTC:{
      flexGrow: 1,
      alignItems: "center"
  },
  scrollViewTCStyling:{
      width: "100%"
  },
  textInputFormTC:{
      width: "90%",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 13,
      backgroundColor: "#c1c1c1",
      paddingLeft: 10,
      maxWidth: 320
  },
  textPostCommentBtn:{
      backgroundColor: "#363636",
      marginTop: 10,
      width: 120,
      height: 35,
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 5,
      marginBottom: 15,
      justifyContent: "center",
      alignItems: "center"
  },
  viewindvComments:{
      backgroundColor: "white",
      width: "90%",
      maxWidth: 320,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
  },
  viewUserName:{
      flex: 1,
      flexDirection: "row"
  },
  textFullName:{
      fontSize: 15,
      fontWeight: "bold"
  },
  textUserName:{
      fontSize: 12,
      textAlignVertical: "center",
      color: "#acacac"
  },
  textContentComment:{
      textAlign: "justify",
      marginTop: 7,
      marginBottom: 5
  },
  textDateDisplayed:{
      fontSize: 12,
      color: "#acacac"
  },
  loggedoutlabel:{
      marginBottom: 30,
      marginTop: 10
  },
  viewNoSearchDisplay:{
      borderWidth: 0,
      width: 150,
      height: 150,
      marginTop: 50
    },
    viewFlexedNoSearch:{
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    textLabelNoSearch:{
      fontSize: 13
    },
    viewContent:{
      width: "100%",
      marginTop: 5,
      marginBottom: 5,
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    textMentionDisplay:{
      backgroundColor: "grey", 
      color: "white", 
      marginRight: 2, 
      marginTop: 2, 
      borderRadius: 2, 
      paddingLeft: 2, 
      paddingRight: 2
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
  },
  progressBar:{
      height: 15,
      backgroundColor: "white",
      width: "90%",
      marginBottom: 10,
      borderRadius: 15
  },
  labelProgressBar:{
      width: "90%",
      fontSize: 13,
      marginBottom: 5,
      marginLeft: 20,
      color: "white"
  },
  viewOfflinePrompt:{
      position: "absolute", 
      zIndex: 1, 
      backgroundColor: "orange", 
      bottom: 20, 
      width: "90%", 
      maxWidth: 300,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white"
  },
  textOfflinePrompt:{
      color: "white",
      fontSize: 15
  },
  textBookInfoMode:{
    marginBottom: 5,
    marginLeft: 10,
    backgroundColor: "black",
    color: "white",
    width: 100,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    textAlignVertical: "center",
    borderRadius: 5
  }
});

export default ViewBookOffline