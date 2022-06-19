import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const HomeTab = () => {
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyling} contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.homeLabel}>Coder's Library</Text>
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
      flex: 1,
      alignItems: 'center'
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
      color: "black",
      fontWeight: "700"
    }
})

export default HomeTab