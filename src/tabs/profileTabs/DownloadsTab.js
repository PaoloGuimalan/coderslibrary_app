import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const DownloadsTab = () => {
  return (
    <View style={styles.mainView}>
      <Text>DownloadsTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: width,
        backgroundColor: "aqua"
    }
})

export default DownloadsTab