import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconIon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import { SET_BOOK_INFO } from '../redux/types/types'
import { bookinfodata } from '../redux/actions/actions'

const ViewBook = ({route, navigation: { goBack, navigate }}) => {
    const source = { uri: route.params.url, cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    const [dropInfoView, setdropInfoView] = useState(true);

    const bookinfo = useSelector(state => state.bookinfo);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(route.params.bookID)
        recentAdderPost()
        getBookInfo()

        return () => { dispatch({type: SET_BOOK_INFO, bookinfo: bookinfodata}) }
    }, [])

    const recentAdderPost = async () => {
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

    const getBookInfo = async () => {
        await AsyncStorage.getItem('token').then((resp) => {
            Axios.get(`https://coderslibraryserver.herokuapp.com/getBookInfo/${route.params.bookID}`, {
                headers: {
                    "x-access-token": resp
                }
            }).then((response) => {
                //dispatch data
                // console.log(response.data)
                dispatch({type: SET_BOOK_INFO, bookinfo: response.data})
            }).catch((err) => {
                //alert error
                // alert("Unable to load Recents");
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
                    <Text numberOfLines={1}>{bookinfo.name}</Text>
                    <TouchableOpacity onPress={() => { setdropInfoView(!dropInfoView) }}>
                        <View style={styles.viewBackButton}>
                            <IconIon name={dropInfoView? 'close' : 'ios-menu'} size={25} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: dropInfoView? 200 : 0, width: "100%", backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#bfbfbf", marginBottom: 10, alignItems: "center" }}>
                <View style={{flex: 1, backgroundColor: "white", width: "100%", flexDirection: "row"}}>
                    <View style={{backgroundColor: "white", width: "50%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Image source={{uri: bookinfo.link_img}} style={{width: 100, height: dropInfoView? 150 : 0, borderWidth: dropInfoView? 1 : 0, borderColor: "#bfbfbf"}} />
                    </View>
                    <View style={{width: "50%", justifyContent: "flex-start", paddingTop: 22}}>
                        <View>
                            <Text>--Navigations Here!--</Text>
                        </View>
                        <Text style={styles.textBookInfo}>Category: {bookinfo.category}</Text>
                        <Text style={styles.textBookInfo}>Publisher: {bookinfo.publisher}</Text>
                        <Text style={styles.textBookInfo}>Author/s: {bookinfo.author}</Text>
                    </View>
                </View>
            </View>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath) => {
                    // console.log(`Number of pages: ${numberOfPages}`);
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
        marginBottom: 5
    }
});

export default ViewBook