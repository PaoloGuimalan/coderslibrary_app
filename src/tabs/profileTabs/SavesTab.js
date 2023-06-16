import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { SET_SAVES } from '../../redux/types/types'
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { MAIN_URL } from '../../resources/constants/variables'

const { width, height } = Dimensions.get("window")

const SavesTab = () => {

  const saves = useSelector(state => state.saves)
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [loadingState, setloadingState] = useState(true);
  const [NoNetwork, setNoNetwork] = useState(false);

  useEffect(() => {
    getSaves()

    return () => {
      dispatch({type: SET_SAVES, saves: []});
      setloadingState(true);
      setNoNetwork(false);
    }
  },[])

  const getSaves = async () => {
    setloadingState(true);
    setNoNetwork(false)
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`${MAIN_URL}/getSaves`, {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        //dispatch response
        dispatch({type: SET_SAVES, saves: response.data})
        setloadingState(false)
      }).catch((err) => {
        //alert error
        setloadingState(false);
        setNoNetwork(true);
      })
    })
  }

  const unsaveBook = async (bookID) => {
    // alert("Unsave")
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`${MAIN_URL}/unsaveBook/${bookID}`, {
        headers: {
            "x-access-token": resp
        }
      }).then((response) => {
        if(response.data.status){
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
    }).catch((err) => {
      //alert error
    })
}

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Saves</Text>
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
                  <TouchableOpacity onPress={() => { getSaves() }}>
                    <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </View>
          ) : (
            saves.length == 0? (
              <View style={styles.viewNoSearchDisplay}>
                  <View style={styles.viewFlexedNoSearch}>
                    <IconIon name='heart-outline' size={80} />
                    <Text style={styles.textLabelNoSearch}>No Saved Books yet.</Text>
                    <TouchableOpacity onPress={() => { getSaves() }}>
                      <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Reload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            ) : (
              <View style={styles.viewRecents}>
              <View style={styles.flexedRecents}>
                {saves.map((book, i) => {
                  return(
                    <TouchableOpacity key={i} disabled={true}>
                      <View style={styles.recentsIndvView}>
                        <Image source={{uri: book.link_img}} style={styles.imgSizing} />
                        <Text numberOfLines={2} style={styles.bookName}>{book.name}</Text>
                        <View style={styles.viewIconsNav}>
                          <TouchableOpacity onPress={() => {navigation.navigate("ViewBook", { url: book.link_dl, bookID: book.id })}}>
                            <View style={styles.viewIconTouch}>
                              <IconFeather name="book-open" size={20} />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { unsaveBook(book.id).then(() => { getSaves() }).catch((err) => { alert(err) }) }}>
                            <View style={styles.viewIconTouch}>
                              <IconIon name="heart" size={20} color="#fe2c55" />
                            </View>
                          </TouchableOpacity>
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
  flex: 0
},
flexedRecents:{
  flex: 1,
  flexDirection: "row",
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
}
})

export default SavesTab