import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const SavesTab = () => {
  return (
    <View style={styles.mainView}>
      <Text>SavesTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: width,
        backgroundColor: "blue"
    }
})

export default SavesTab