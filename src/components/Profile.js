import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'

const Profile = ({route, navigation: { goBack }}) => {

  useEffect(() => {
    // console.log(route)
  }, [])

  return (
    <View style={styles.mainView}>
      <View style={styles.navBar}>
        <View style={styles.flexBar}>
          <TouchableOpacity onPress={() => { goBack() }}>
            <View style={styles.viewBackButton}>
                <IconIon name='ios-chevron-back-outline' size={25} />
                <Text>Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text>Profile | {route.params.userName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    navBar:{
        backgroundColor: "green",
        width: "100%",
        height: 50
    },
    flexBar:{
        flex: 1,
        justifyContent: "center"
    },
    viewBackButton:{
        backgroundColor: "white",
        width: 80,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
})

export default Profile