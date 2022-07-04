import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, ToastAndroid, Platform, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconFeather from 'react-native-vector-icons/Feather'
import IconOcti from 'react-native-vector-icons/Octicons'
import { useSelector, useDispatch } from 'react-redux'
import { SET_BOOK_INFO } from '../redux/types/types'
import { bookinfodata } from '../redux/actions/actions'
import ClipBoard from '@react-native-clipboard/clipboard'

const ViewBook = ({route, navigation: { goBack, navigate }}) => {
    const source = { uri: route.params.url, cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    const [dropInfoView, setdropInfoView] = useState(true);
    const [heartStatus, setheartStatus] = useState(false);
    const [viewDefault, setviewDefault] = useState(true);

    const bookinfo = useSelector(state => state.bookinfo);
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(route.params.bookID)
        getBookInfo()
        recentAdderPost()

        return () => { dispatch({type: SET_BOOK_INFO, bookinfo: bookinfodata}) }
    }, [])

    const recentAdderPost = async () => {
        if(account.status){
            await AsyncStorage.getItem('token').then((resp) => {
                Axios.post('https://coderslibraryserver.herokuapp.com/addRecents', {
                    book_id: route.params.bookID
                },{
                    headers: {
                        "x-access-token": resp
                    }
                }).catch((err) => {
                    //alert error
                    // alert("Unable to load Recents");
                })
            })
        }
    }

    const getBookInfo = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            Axios.get(`https://coderslibraryserver.herokuapp.com/getBookInfo/${route.params.bookID}/${account.status? account.userName : null}`, {
                headers: {
                    "x-access-token": resp
                }
            }).then((response) => {
                //dispatch data
                // console.log(response.data.bookInfo)
                dispatch({type: SET_BOOK_INFO, bookinfo: response.data.bookInfo})
                setheartStatus(response.data.saveInfo)
            }).catch((err) => {
                //alert error
                // alert("Unable to load Recents");
            })
        })
    }

    const saveBook = async () => {
        // alert("Save")
        await AsyncStorage.getItem('token').then((resp) => {
            Axios.post(`https://coderslibraryserver.herokuapp.com/saveBook`, {
                bookID: bookinfo.id
            },{
                headers: {
                    "x-access-token": resp
                }
            }).then((response) => {
                //dispatch data
                // console.log(response.data)
                if(response.data.status){
                    setheartStatus(true);
                    if(Platform.OS === 'android'){
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    }
                    else{
                        alert(response.data.message)
                    }
                }
                else{
                    console.log(response.data)
                }
            }).catch((err) => {
                //alert error
                // alert("Unable to load Recents");
                if(Platform.OS === 'android'){
                    ToastAndroid.show("Network Error", ToastAndroid.SHORT)
                }
                else{
                    alert("Network Error")
                }
            })
        })
    }

    const donwloadBook = () => {
        alert("Coming Soon!")
    }

    const copyLink = () => {
        // alert("Link")
        ClipBoard.setString(`https://coderslibrary.netlify.app/books?book_id=${bookinfo.id}`)
        if(Platform.OS === 'android'){
            ToastAndroid.show("Link copied to clipboard", ToastAndroid.SHORT)
        }
        else{
            alert("Link copied to clipboard")
        }
    }

    const openLink = () => {
        // alert("Open")
        Linking.openURL(`https://coderslibrary.netlify.app/books?book_id=${bookinfo.id}`)
    }

    const unsaveBook = async () => {
        // alert("Unsave")
        await AsyncStorage.getItem('token').then((resp) => {
            Axios.get(`https://coderslibraryserver.herokuapp.com/unsaveBook/${bookinfo.id}`, {
                headers: {
                    "x-access-token": resp
                }
            }).then((response) => {
                if(response.data.status){
                    setheartStatus(false)
                    if(Platform.OS === 'android'){
                        ToastAndroid.show(response.data.message , ToastAndroid.SHORT)
                    }
                    else{
                        alert(response.data.message)
                    }
                }
                else{
                    if(Platform.OS === 'android'){
                        ToastAndroid.show(response.data.message , ToastAndroid.SHORT)
                    }
                    else{
                        alert(response.data.message)
                    }
                }
            }).catch((err) => {
                if(Platform.OS === 'android'){
                    ToastAndroid.show("Network Error!" , ToastAndroid.SHORT)
                }
                else{
                    alert("Network Error!")
                }
            })
        })
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
                    <Text numberOfLines={1} style={{fontWeight: "bold"}}>{bookinfo.name}</Text>
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
                        {bookinfo.link_img != "..."? (
                            <Image source={{uri: bookinfo.link_img}} style={{width: 100, height: dropInfoView? 150 : 0, borderWidth: dropInfoView? 1 : 0, borderColor: "#bfbfbf"}} />
                        ) : (
                            <View style={{width: 100, height: dropInfoView? 150 : 0, borderWidth: dropInfoView? 1 : 0, borderColor: "#bfbfbf", backgroundColor: "#bfbfbf"}} >
                            </View>
                        )}
                    </View>
                    <View style={{width: "60%", justifyContent: "flex-start", paddingTop: 25, paddingRight: 10}}>
                        <View style={styles.viewNavigationButtons}>
                            {account.status? (
                                <View style={styles.flexedNavigationButtons}>
                                    {heartStatus? (
                                        <TouchableOpacity onPress={() => { unsaveBook() }}>
                                            <View style={styles.indivCountDetails}>
                                                <IconIon name='heart' size={20} color="#fe2c55" />
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => { saveBook() }}>
                                            <View style={styles.indivCountDetails}>
                                                <IconIon name='heart-outline' size={20} />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity onPress={() => { donwloadBook() }}>
                                        <View style={styles.indivCountDetails}>
                                            <IconFeather name='download' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { copyLink() }}>
                                        <View style={styles.indivCountDetails}>
                                            <IconFeather name='link' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { openLink() }}>
                                        <View style={styles.indivCountDetails}>
                                            <IconMCI name='open-in-new' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.flexedNavigationButtons}>
                                    <TouchableOpacity onPress={() => { copyLink() }}>
                                        <View style={styles.indivCountDetails}>
                                            <IconFeather name='link' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { openLink() }}>
                                        <View style={styles.indivCountDetails}>
                                            <IconMCI name='open-in-new' size={20} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <Text style={styles.textBookInfo}>Category: {bookinfo.category}</Text>
                        <Text style={styles.textBookInfo}>Publisher: {bookinfo.publisher}</Text>
                        <Text style={styles.textBookInfo} numberOfLines={2}>Author/s: {bookinfo.author}</Text>
                        <TouchableOpacity onPress={() => { setviewDefault(!viewDefault) }}>
                            <View style={styles.viewTagComments}>
                                {viewDefault? (
                                    <View style={styles.flexedTagComments}>
                                        <Text style={{marginLeft: 5}}>Tags &#38; Comments</Text>
                                        <IconIon name='ios-chevron-forward-outline' size={23} />
                                    </View>
                                ) : (
                                    <View style={styles.flexedTagComments}>
                                        <IconIon name='ios-chevron-back-outline' size={20} />
                                        <Text style={{marginLeft: 5}}>Continue Reading</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 10}}></View>
            {viewDefault? (
                <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
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
            ) : (
                <View>
                    <Text>Tags &#38; Comments</Text>
                </View>
            )}
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
        backgroundColor: "white"
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
        height: 30,
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
        maxWidth: 170,
        borderRadius: 5,
        height: 35
    },
    flexedTagComments:{
        flex: 1,
        flexDirection: "row",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    }
});

export default ViewBook