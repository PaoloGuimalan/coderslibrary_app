import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ToastAndroid, Platform, Alert, Linking, TextInput, NativeModules, LogBox } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
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
import { SET_BOOKMARKS, SET_BOOKPAGE_RECORD, SET_BOOK_COMMENTS, SET_BOOK_INFO, SET_BOOK_INFO_OFFLINE } from '../redux/types/types'
import { bookinfodata, bookinfoofflineState } from '../redux/actions/actions'
import ClipBoard from '@react-native-clipboard/clipboard'
import * as Animatable from 'react-native-animatable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { openDatabase } from 'react-native-sqlite-storage'
import RNFetchBlob from 'rn-fetch-blob/index'
import startTransition from '../libraries/startTransitionHook'
import { MAIN_URL } from '../resources/constants/variables'

const db = openDatabase({
  name: "coderslibrary_db"
})

const ViewBookOffline = ({route, navigation: { goBack, navigate }}) => {

  const source = { uri: `file://${route.params.url}` };

  const bookinfooffline = useSelector(state => state.bookinfooffline);
  const dispatch = useDispatch()

  const bookID = route.params.bookID;
  const account = useSelector(state => state.account);
  const bookpagerecord = useSelector(state => state.bookpagerecord)
  const bookmarkslist = useSelector(state => state.bookmarkslist)

  const [dropInfoView, setdropInfoView] = useState(true);
  const [noPages, setnoPages] = useState("");
  const [totalPages, settotalPages] = useState("");
  const [loaderButton, setloaderButton] = useState(false);
  const [bookmarksWindow, setbookmarksWindow] = useState(false);
  const [addbookmarksWindow, setaddbookmarksWindow] = useState(false);

  const [bookmarkLabelState, setbookmarkLabelState] = useState("");
  const [bookmarkPageState, setbookmarkPageState] = useState("");

  const PDFRef = useRef(null);

  const setPageState = (page) => {
    setnoPages(page)
    startTransition(() => {
        checkBookRecord()
    }, 1000)
  }

  useEffect(() => {
    initiateBookRecord()
    initiateBookmarks()

    return () => {
        dispatch({type: SET_BOOKPAGE_RECORD, bookpagerecord: { bookID: "", bookPage: "" }})
        dispatch({type: SET_BOOKMARKS, bookmarkslist: []})
    }
  },[])

  const initiateBookmarks = () => {
    db.transaction(txn => {
        txn.executeSql(`SELECT * FROM bookmarks WHERE bookID = ?`, [bookID],
        (sqlTxn, res) => {
            // console.log(res.rows.length)
            if(res.rows.length > 0){
                var arr = []
                for(var i = 0; i < res.rows.length; i++){
                    // console.log(res.rows.length)
                    arr.push(res.rows.item(i))
                    if(i+1 == res.rows.length){
                        // console.log(res.rows.item(i).bookName)
                        // console.log(arr)
                        dispatch({type: SET_BOOKMARKS, bookmarkslist: arr})
                    }
                }
            }
            else{
                // console.log(res.rows.item(0))
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
  }

  const initiateBookRecord = () => {
    db.transaction(txn => {
        txn.executeSql(`SELECT * FROM bookprevious WHERE bookID = ?`, [bookID],
        (sqlTxn, res) => {
            // console.log(res.rows.length)
            if(res.rows.length == 0){
                dispatch({type: SET_BOOKPAGE_RECORD, bookpagerecord: { bookID: bookID, bookPage: "1" }})
            }
            else{
                // console.log(res.rows.item(0))
                dispatch({type: SET_BOOKPAGE_RECORD, bookpagerecord: { bookID: res.rows.item(0).bookID, bookPage: res.rows.item(0).bookRecentPage }})
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
  }

  const checkBookRecord = () => {
    db.transaction(txn => {
        txn.executeSql(`SELECT * FROM bookprevious WHERE bookID = ?`, [bookID],
        (sqlTxn, res) => {
            // console.log(res.rows.length)
            if(res.rows.length == 0){
                insertBookRecord()
            }
            else{
                if(noPages != 1 && noPages != "1" && noPages != ""){
                    updateBookRecord()
                }
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
  }

  const updateBookRecord = () => {
    db.transaction(txn => {
        txn.executeSql(`UPDATE bookprevious SET bookRecentPage = ? WHERE bookID = ?`, [noPages, bookID],
        (sqlTxn, res) => {
            // console.log(res.rows.length)
            if(res.rowsAffected > 0){
                // console.log("Book Record Updated!");
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
  }

  const insertBookRecord = () => {
    db.transaction(txn => {
        txn.executeSql(`INSERT INTO bookprevious (bookID, bookRecentPage) VALUES (?,?)`, [bookID, noPages],
        (sqlTxn, res) => {
            // console.log(res.rows.length)
            if(res.rowsAffected > 0){
                // console.log("Book Record Saved!");
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
  }

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

const gotoOnline = async () => {
  // navigation.navigate("ViewBook", { url: items.link_dl, bookID: items.id })
//   alert("Online")
    setloaderButton(true)
    await AsyncStorage.getItem('token').then((resp) => {
        Axios.get(`${MAIN_URL}/getBookInfo/${route.params.bookID}/${account.status? account.userName : null}`, {
            headers: {
                "x-access-token": resp
            }
        }).then((response) => {
            //dispatch data
            // console.log(response.data.bookInfo)
            setloaderButton(false)
            navigate("ViewBook", { url: response.data.bookInfo.link_dl, bookID: response.data.bookInfo.id })
        }).catch((err) => {
            //alert error
            // alert("Unable to load Recents");
            setloaderButton(false)
            if(Platform.OS === 'android'){
                ToastAndroid.show("Cannot go Online!", ToastAndroid.SHORT)
            }
            else{
                alert("Cannot go Online!")
            }
        })
    })
}

const setToPage = () => {
    if(bookpagerecord.bookPage != "" && bookpagerecord.bookPage != null){
        PDFRef.current.setPage(parseInt(bookpagerecord.bookPage))
    }
    else{
        initiateBookRecord()
        if(Platform.OS === 'android'){
            ToastAndroid.show("Click again", ToastAndroid.SHORT)
        }
        else{
            alert("Click again")
        }
    }
}

const pageInputChange = (e) => {
    if(e != ""){
        if(e != 0 && e != "0"){
            if(parseInt(e) > parseInt(totalPages)){
                setbookmarkPageState("")
                if(Platform.OS === 'android'){
                    ToastAndroid.show("Page exceeds the Total Pages", ToastAndroid.SHORT)
                }
                else{
                    alert("Page exceeds the Total Pages")
                }
            }
            else{
                setbookmarkPageState(e)
            }
        }
        else{
            setbookmarkPageState(e)
            if(Platform.OS === 'android'){
                ToastAndroid.show("Page Cannot be Zero!", ToastAndroid.SHORT)
            }
            else{
                alert("Page Cannot be Zero!")
            }
        }
    }
    else{
        setbookmarkPageState("")
        if(Platform.OS === 'android'){
            ToastAndroid.show("Page Cannot be Empty!", ToastAndroid.SHORT)
        }
        else{
            alert("Page Cannot be Empty!")
        }
    }
}

const setpageInputCurrent = () => {
    setbookmarkPageState(noPages.toString())
}

const confirmBookmark = () => {
    // alert(bookmarkPageState)
    if(bookmarkPageState == ""){
        if(Platform.OS === 'android'){
            ToastAndroid.show("Page not applied!", ToastAndroid.SHORT)
        }
        else{
            alert("Page not applied!")
        }
    }
    else{
        if(bookmarkPageState == "0"){
            if(Platform.OS === 'android'){
                ToastAndroid.show("Page Invalid", ToastAndroid.SHORT)
            }
            else{
                alert("Page Invalid")
            }
        }
        else{
            if(bookmarkLabelState == ""){
                // alert("Empty")
                insertBookMarkDB("No Label")
            }
            else if(!bookmarkLabelState.replace(/\s/g, '').length){
                // alert("Empty String")
                insertBookMarkDB("No Label")
            }
            else{
                // alert("OK")
                insertBookMarkDB(bookmarkLabelState)
            }
        }
    }
}

const insertBookMarkDB = (valuemark) => {
    db.transaction(txn => {
        txn.executeSql(`INSERT INTO bookmarks (bookID, bookLabel, bookRecentPage) VALUES (?,?,?)`,
        [bookID, valuemark, bookmarkPageState],
        (sqlTxn, res) => {
            if(res.rowsAffected > 0){
                if(Platform.OS === 'android'){
                    ToastAndroid.show("Bookmark Saved!", ToastAndroid.SHORT)
                }
                else{
                    alert("Bookmark Saved!")
                }
                initiateBookmarks()
                setaddbookmarksWindow(false); 
                setbookmarksWindow(true); 
                setbookmarkLabelState(""); 
                setbookmarkPageState("")
            }
            else{
                if(Platform.OS === 'android'){
                    ToastAndroid.show("Bookmarks were not Saved!", ToastAndroid.SHORT)
                }
                else{
                    alert("Bookmarks were not Saved!")
                }
            }
        },
        (error) => {
            if(Platform.OS === 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
            else{
                alert(error.message)
            }
        })
    })
}

  return (
      <View style={styles.container}>
            {addbookmarksWindow? (
                <View style={styles.viewDownload}>
                    <View style={styles.viewDownloadDisplay}>
                        <TouchableOpacity onPress={() => { setaddbookmarksWindow(false); setbookmarksWindow(true); setbookmarkLabelState(""); setbookmarkPageState("") }} style={{position: "absolute", right: 10, top: 10}}>
                            <View style={{backgroundColor: "transparent"}}>
                                <IconIon name='close' size={20} style={{color: "white"}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.labelDownloadDisplay} numberOfLines={1}>Add a Bookmark</Text>
                        <TextInput onChangeText={(e) => { setbookmarkLabelState(e) }} defaultValue={bookmarkLabelState} placeholder='Bookmark Label' style={{backgroundColor: "white", height: 35, fontSize: 13, marginTop: 10, width: "80%", textAlign: "center", borderRadius: 5}} />
                        <View style={{width: "80%", backgroundColor: "transparent", marginTop: 5, height: 50}}>
                            <View style={{flex: 1, backgroundColor: "transparent", flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly"}}>
                                <TextInput keyboardType='numeric' onChangeText={(e) => { pageInputChange(e) }} defaultValue={bookmarkPageState} placeholder='Page Number' style={{backgroundColor: "white", height: 35, fontSize: 13, width: "48%", textAlign: "center", borderRadius: 5}} />
                                <TouchableOpacity style={{width: "48%", height: 35}} onPress={() => { setpageInputCurrent() }}>
                                    <Text style={{backgroundColor: "grey", height: "100%", borderRadius: 5, borderWidth: 1, borderColor: "white", color: "white", textAlign: "center", textAlignVertical: 'center', paddingLeft: 5, paddingRight: 5, fontSize: 13}}>Set to Current Page</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { confirmBookmark() }}>
                            <Text style={{backgroundColor: "limegreen", width: 100, marginTop: 10, textAlign: 'center', height: 30, textAlignVertical: "center", borderRadius: 5, color: "white", borderWidth: 1, borderColor: "white"}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
            {bookmarksWindow? (
                <View style={styles.viewDownload}>
                    <View style={styles.viewDownloadDisplay}>
                        <TouchableOpacity onPress={() => { setbookmarksWindow(!bookmarksWindow) }} style={{position: "absolute", right: 10, top: 10}}>
                            <View style={{backgroundColor: "transparent"}}>
                                <IconIon name='close' size={20} style={{color: "white"}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.labelDownloadDisplay} numberOfLines={1}>Bookmarks</Text>
                        <Text style={styles.labelBookmarks}>Last Page Visited: Page {bookpagerecord.bookPage}</Text>
                        <TouchableOpacity onPress={() => { setToPage() }}>
                            <View style={{backgroundColor: "grey", width: 100, marginTop: 5, marginBottom: 10, height: 30, justifyContent: 'center', alignItems: "center", borderRadius: 5}}>
                                <Text style={{color: "white", fontSize: 13}}>Go this Page</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.labelBookmarks}>Pages Bookmarked</Text>
                        <TouchableOpacity onPress={() => { setaddbookmarksWindow(true); setbookmarksWindow(false); }}>
                            <Text style={{backgroundColor: "grey", width: 120, height: 30, textAlign: 'center', textAlignVertical: 'center', borderRadius: 5, color: "white", fontSize: 13}}>Add a Bookmark</Text>
                        </TouchableOpacity>
                        <View style={{height: 200, backgroundColor: "grey", width: "95%", borderRadius: 3, marginTop: 10}}>
                            <ScrollView contentContainerStyle={{flexGrow: 1, flexDirection: "column", alignItems: "center", paddingTop: 10, paddingBottom: 10}}>
                                {bookmarkslist.length == 0? (
                                    <View style={{marginTop: 75}}>
                                        <Text style={{color: "#acacac", fontSize: 13}}>No Bookmarks Yet</Text>
                                        <TouchableOpacity onPress={() => { initiateBookmarks() }}>
                                            <Text style={{color: "#acacac", fontSize: 13, textAlign: "center", textDecorationLine: "underline"}}>Reload</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    bookmarkslist.map((lbls, i) => {
                                        return(
                                            <TouchableOpacity style={{width: "80%"}} key={i} onPress={() => { PDFRef.current.setPage(parseInt(lbls.bookRecentPage)) }}>
                                                <View style={{width: "100%", backgroundColor: "#bfbfbf", height: 40, marginTop: 5, borderRadius: 5}}>
                                                    <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                                        <View style={{backgroundColor: "transparent", height: "100%", width: "20%", alignItems: 'center', justifyContent: "center"}}>
                                                            <Text style={{backgroundColor: "grey", width: "70%", height: "70%", textAlign: 'center', textAlignVertical: "center", borderRadius: 500}}>{lbls.bookRecentPage}</Text>
                                                        </View>
                                                        <Text style={{paddingLeft: 5, width: "80%", paddingRight: 5}} numberOfLines={1}>{lbls.bookLabel}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
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
            <View style={{height: dropInfoView? 225 : 0, width: "100%", backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#bfbfbf", marginBottom: 0, alignItems: "center", display: dropInfoView? "flex" : "none" }}>
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
                        <Text style={styles.textBookInfo} numberOfLines={1}>Publisher: {bookinfooffline.bookPublisher}</Text>
                        <Text style={styles.textBookInfo} numberOfLines={1}>Author/s: {bookinfooffline.bookAuthor}</Text>
                        <TouchableOpacity disabled={loaderButton} onPress={() => { gotoOnline() }}>
                            <View style={styles.viewTagComments}>
                              {loaderButton? (
                                <View style={styles.flexedTagComments}>
                                    <Animatable.View style={{backgroundColor: "transparent", width: "100%", alignItems: 'center'}} animation="rotate" duration={1000} delay={100} iterationDelay={0} iterationCount="infinite" easing="ease-out">
                                        <IconAntDesign name='loading1' size={15} color="black" />
                                    </Animatable.View>
                                </View>
                              ) : (
                                <View style={styles.flexedTagComments}>
                                    <Text style={{marginLeft: 5}}>Go Online</Text>
                                    <IconIon name='ios-chevron-forward-outline' size={23} />
                                </View>
                              )}
                            </View>
                        </TouchableOpacity>
                        <View style={{backgroundColor: "#acacac", height: 60, marginTop: 5, justifyContent: 'center', borderRadius: 5, marginLeft: 10, maxWidth: 170}}>
                            <Text style={styles.textBookInfoPages}>Current Page: {noPages} / {totalPages}</Text>
                            <TouchableOpacity onPress={() => { setbookmarksWindow(!bookmarksWindow) }}>
                                <View style={{width: 100, height: 25, marginLeft: 10}}>
                                    <View style={{backgroundColor: "#ffffff", flex: 1, flexDirection: 'row', alignItems: 'center', borderRadius: 5}}>
                                        <Text style={{marginLeft: 10}}>Bookmarks</Text>
                                        <IconIon name='ios-chevron-forward-outline' size={17} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 10}}></View>
            <Pdf
                ref={PDFRef}
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                    settotalPages(numberOfPages)
                    // console.log(`Number of pages: ${numberOfPages} | ${filePath}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    setPageState(page)
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
  textBookInfoPages:{
    marginBottom: 5,
    marginLeft: 10,
    fontWeight: "bold"
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
  },
  labelDownloadDisplay:{
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  labelBookmarks:{
    width: "90%",
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 20,
    color: "white",
    marginTop: 10
  }
});

export default ViewBookOffline