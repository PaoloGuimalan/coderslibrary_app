import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const BooksTab = () => {

  const [bookslist, setbookslist] = useState([]);

  useEffect(() => {
    Axios.get("https://firebasestorage.googleapis.com/v0/b/coderslibrary-d2244.appspot.com/o/json%2Fdata_books.json?alt=media&token=968cf5f6-9dc3-4299-be06-882243511ce9")
    .then((response) => {
        // console.log(response.data.books);
        setbookslist(response.data.books)
    })
  }, [])

  return (
    <View style={styles.mainView}>
      <Text style={styles.homeLabel}>Books</Text>
      <View style={styles.viewBooksContainer}>
        <ScrollView style={styles.scrollViewStyling} contentContainerStyle={styles.scrollViewContainer}>
           {bookslist.map((items, i) => {
                return(
                    <View key={i} style={styles.viewBookSizingList}>
                        <Image source={{uri: items.link_img}} style={styles.imgSizing} />
                        {/* <Text>{items.link_img}</Text> */}
                    </View>
                )
           })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    scrollViewStyling:{
      backgroundColor: "white",
      width: "100%",
      zIndex: 2
    },
    scrollViewContainer:{
      alignItems: 'center',
      flexDirection: "row",
      flexGrow: 1,
      paddingBottom: 80,
      paddingTop: 80,
      flexWrap: "wrap",
      justifyContent: "center"
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
      marginLeft: 10,
      marginRight: 10
    },
    homeLabel:{
      fontSize: 18,
      margin: 10,
      marginTop: 20,
      color: "black",
      backgroundColor: "black",
      color: "white",
      width: 80,
      height: 40,
      textAlignVertical: "center", 
      textAlign: "center",
      padding: 5,
      borderRadius: 10,
      position: "absolute",
      top: 0,
      zIndex: 1,
      borderWidth: 1,
      borderColor: "white"
    },
    viewBooksContainer:{
        width: "100%",
        height: "100%",
        backgroundColor: "green"
    },
    testlabels:{
        fontSize: 40,
        margin: 20
    }, 
    imgSizing:{
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: "grey"
    },
    viewBookSizingList:{
        margin: 5
    }
})

export default BooksTab