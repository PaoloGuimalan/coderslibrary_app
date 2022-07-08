import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { SET_DOWNLOADS } from '../../redux/types/types';

const db = openDatabase({
  name: "coderslibrary_db"
})

const { width, height } = Dimensions.get("window")

const DownloadsTab = ({navigation}) => {

  const downloadslist = useSelector(state => state.downloadslist);
  const dispatch = useDispatch()

  const [loadingState, setloadingState] = useState(true);

  useEffect(() => {
    getDownloads()

    return () => {
      setloadingState(true);
    }
  },[])

  const getDownloads = () => {
    setloadingState(true)
    db.transaction(txn => {
      txn.executeSql(`SELECT * FROM books`,[],
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
              dispatch({type: SET_DOWNLOADS, downloadslist: arr})
            }
          }
        }
        setloadingState(false)
      },
      (error) => {
        console.log(error.message)
      })
    })
  }

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Downloads</Text>
        {loadingState? (
          <Animatable.View animation="rotate" duration={1000} delay={100} iterationDelay={0} iterationCount="infinite" easing="ease-out" style={styles.viewNoSearchDisplay}>
            <View style={styles.viewFlexedNoSearch}>
              <IconAntDesign name='loading1' size={30} />
            </View>
          </Animatable.View>
        ) : (
          downloadslist.length == 0? (
            <View style={styles.viewNoSearchDisplay}>
              <View style={styles.viewFlexedNoSearch}>
                <IconFeather name='download' size={80} />
                <Text style={styles.textLabelNoSearch}>No Downloads yet.</Text>
                <TouchableOpacity onPress={() => { getDownloads() }}>
                  <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Reload</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewRecents}>
            <View style={styles.flexedRecents}>
            {downloadslist.map((items, i) => {
              return(
                <TouchableOpacity key={i} disabled={true}>
                  <View style={styles.recentsIndvView}>
                    <Image source={{uri: `file://${items.bookImg}`}} style={styles.imgSizing} />
                    <Text numberOfLines={2} style={styles.bookName}>{items.bookName}</Text>
                    <View style={styles.viewIconsNav}>
                      <TouchableOpacity onPress={() => { navigation.navigate("ViewBookOffline", { url: items.bookPath, bookID: items.bookID }) }}>
                        <View style={styles.viewIconTouch}>
                          <IconFeather name="book-open" size={20} />
                          <Text style={styles.openTextBook}>Open Book</Text>
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
      width: 100,
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

export default DownloadsTab