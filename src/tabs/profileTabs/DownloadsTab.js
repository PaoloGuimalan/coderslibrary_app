import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const DownloadsTab = () => {
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Downloads</Text>
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
    }
})

export default DownloadsTab