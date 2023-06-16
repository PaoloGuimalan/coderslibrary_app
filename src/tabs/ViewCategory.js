import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { MAIN_URL } from '../resources/constants/variables';

const ViewCategory = ({route, navigation}) => {

  const [loader, setloader] = useState(true);
  const [bookslistcategory, setbookslistcategory] = useState([]);

  useEffect(() => {
    Axios.get(`${MAIN_URL}/categoryList/${route.params.catname}`)
    .then((response) => {
      // console.log(response.data)
      setbookslistcategory(response.data);
      setloader(false)
    }).catch((err) => {
      setbookslistcategory([]);
    })

    return () => {
      setbookslistcategory([]);
      setloader(true)
    }
  }, [route.params.catname])

  return (
    <View style={styles.mainView}>
      <Text style={styles.categoryLabel}>Category - {route.params.catname}</Text>
      <ScrollView style={styles.scrollViewStyling} contentContainerStyle={styles.scrollViewContainer}>
           {loader? (
            <Text>Loading...</Text>
           ) : (
            bookslistcategory.map((items, i) => {
              return(
                  <TouchableOpacity key={i} onPress={() => {navigation.navigate("ViewBook", { url: items.link_dl, bookID: items.id })}}>
                    <View style={styles.viewBookSizingList}>
                        <Image source={{uri: items.link_img}} style={styles.imgSizing} />
                        <Text numberOfLines={1} style={styles.textWNLabels}>{items.name}</Text>
                    </View>
                  </TouchableOpacity>
              )
            })
           )}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView:{
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: 0
  },
  categoryLabel:{
    backgroundColor: "black",
    color: "white",
    minWidth: 100,
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 20
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
    paddingTop: 0,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  imgSizing:{
    width: 150,
    height: 200,
    borderWidth: 1,
    borderColor: "grey"
  },
  viewBookSizingList:{
    margin: 5
  },
  textWNLabels:{
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "transparent",
    width: 150,
    marginBottom: 10
  },
})

export default ViewCategory