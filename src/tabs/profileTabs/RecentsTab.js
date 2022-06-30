import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window")

const RecentsTab = () => {

  const recents = useSelector(state => state.recents);

  const navigation = useNavigation()

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Recents</Text>
        <View style={styles.viewRecents}>
          <View style={styles.flexedRecents}>
            {recents.map((book, i) => {
              return(
                <TouchableOpacity key={i} disabled={true}>
                  <View style={styles.recentsIndvView}>
                    <Image source={{uri: book.link_img}} style={styles.imgSizing} />
                    <Text numberOfLines={2} style={styles.bookName}>{book.name}</Text>
                    <View style={styles.viewIconsNav}>
                      <TouchableOpacity onPress={() => {navigation.navigate("ViewBook", { url: book.link_dl, bookID: book.id })}}>
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
      borderColor: "grey"
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
    }
})

export default RecentsTab