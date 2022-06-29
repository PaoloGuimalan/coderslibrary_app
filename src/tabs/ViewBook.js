import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Pdf from 'react-native-pdf'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ViewBook = ({route, navigation}) => {
    const source = { uri: route.params.url, cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    useEffect(() => {
        // console.log(route.params.bookID)
        recentAdderPost()
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

    return (
        <View style={styles.container}>
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
    }
});

export default ViewBook