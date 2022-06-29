import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImgLogo from '../resources/imgs/book_img.png'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORIES_LIST, HOME_UPDATES } from '../redux/types/types';

const HomeTab = ({navigation}) => {

  const [loader, setloader] = useState(true);
  const [loadercat, setloadercat] = useState(true);

  const date = new Date().toDateString()

  const homeupdates = useSelector(state => state.homeupdates)
  const categorieslist = useSelector(state => state.categorieslist)
  const account = useSelector(state => state.account);
  const dispatch = useDispatch()

  useEffect(() => {
    Axios.get("https://coderslibraryserver.herokuapp.com/books")
    .then((response) => {
        // console.log(response.data.books);
        // setbookslist(response.data)
        dispatch({type: HOME_UPDATES, homeupdates: response.data})
        setloader(false)
    }).catch((err) => {
      dispatch({type: HOME_UPDATES, homeupdates: []})
    })
  }, [])

  useEffect(() => {
    Axios.get("https://coderslibraryserver.herokuapp.com/categories")
    .then((response) => {
        // console.log(response.data.books);
        // setbookslist(response.data)
        dispatch({type: CATEGORIES_LIST, categorieslist: response.data})
        setloadercat(false)
    }).catch((err) => {
      dispatch({type: CATEGORIES_LIST, categorieslist: []})
    })
  }, [])

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyling} contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.homeLabel}>Coder's Library</Text>
        <View style={styles.viewWelcome}>
          <View style={styles.flexedView}>
            <View style={styles.imageView}>
              <Image source={ImgLogo} style={styles.imageLogoWelcome} />
            </View>
            <View style={styles.viewParagraph}>
              <Text style={styles.mainWelcomeText}>Welcome to Coder's Library</Text>
              <Text style={styles.paragraphWelcome}>In here you can browse, read and save pdf books of your desire. Coder's Library is made mainly for you as a reader to have a better experience in using Digital Books. Have fun reading!</Text>
            </View>
          </View>
        </View>
        <Text style={styles.labelIndicators}>What's New?</Text>
        <View style={styles.viewWhatsN}>
          <ScrollView horizontal style={styles.scrollWhatsN}>
            {/* <Text>{date.split(" ")[3]}</Text> */}
            {loader? (
              <View style={styles.viewLoader}>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
              </View>
            ) : (
              homeupdates.map((items, i) => {
                return(
                  <TouchableOpacity key={i} onPress={() => {navigation.navigate("ViewBook", { url: items.link_dl, bookID: items.id })}}>
                    <View style={styles.homeupdatesView}>
                      <Image source={{uri: items.link_img}} style={styles.imageWNSizing} />
                      <Text numberOfLines={2} style={styles.textWNLabels}>{items.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </View>
        <Text style={styles.labelIndicators}>Categories</Text>
        <View style={styles.viewWhatsN}>
          <ScrollView horizontal style={styles.scrollWhatsN}>
            {/* <Text>{date.split(" ")[3]}</Text> */}
            {loadercat? (
              <View style={styles.viewLoader}>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
                <View style={styles.homeupdatesView}>
                  <View style={styles.imageWNSizingLoader} />
                  <View style={styles.viewTextLoader} />
                </View>
              </View>
            ) : (
              categorieslist.map((items, i) => {
                return(
                  <TouchableOpacity key={i} onPress={() => {navigation.navigate("ViewCategory", { catname: items.category })}}>
                    <View style={styles.homeupdatesView}>
                      <Image source={{uri: items.img_prev}} style={styles.imageCatSizing} />
                      <Text style={styles.textWNLabels}>{items.category}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </View>
      </ScrollView>
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
      width: "100%"
    },
    scrollViewContainer:{
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 150
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
      fontSize: 20,
      margin: 10,
      marginTop: 15,
      color: "white",
      backgroundColor: "black",
      padding: 10,
      paddingBottom: 5,
      paddingTop: 5,
      borderRadius: 10,
      marginBottom: 20
    },
    viewWelcome:{
      borderWidth: 1,
      width: "90%",
      borderRadius: 5,
      height: 170,
    },
    imageLogoWelcome:{
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 10
    },
    flexedView:{
      width: "100%",
      backgroundColor: "black",
      height: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
    },
    paragraphWelcome:{
      width: "100%",
      color: "white",
      textAlign: "justify"
    },
    imageView:{
      backgroundColor: "transparent",
      width: "40%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    viewParagraph:{
      width: "60%",
      paddingRight: 10
    },
    mainWelcomeText:{
      color: "white",
      fontSize: 15,
      marginBottom: 10,
      fontWeight: "bold"
    },
    labelIndicators:{
      marginTop: 30,
      textAlign: "left",
      width: "85%",
      fontSize: 20,
      color: "black",
      fontWeight: "700",
      marginBottom: 15
    },
    viewWhatsN:{
      width: "90%",
      height: 250,
      borderWidth: 0,
      borderColor: "black"
    },
    scrollWhatsN:{
      backgroundColor: "white"
    },
    homeupdatesView:{
      borderWidth: 0,
      borderColor: "black",
      width: 160,
      marginRight: 5,
      alignItems: "center"
    },
    imageWNSizing:{
      width: 150,
      height: 200,
      borderWidth: 1,
      borderColor: "grey"
    },
    textWNLabels:{
      textAlign: "center",
      marginTop: 10,
      width: 150
    },
    imageCatSizing:{
      width: 150,
      height: 200,
      borderWidth: 0,
      borderColor: "grey"
    },
    viewLoader:{
      flex: 1,
      flexDirection: "row"
    },
    imageWNSizingLoader:{
      width: 150,
      height: 200,
      borderWidth: 1,
      borderColor: "#ebebeb",
      backgroundColor: "#ebebeb"
    },
    viewTextLoader:{
      width: "85%",
      height: 20,
      backgroundColor: "#ebebeb",
      marginTop: 10
    }
})

export default HomeTab