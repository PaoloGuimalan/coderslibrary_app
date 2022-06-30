import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const RecentsTab = () => {
  return (
    <View style={styles.mainView}>
      <Text>RecentsTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: width,
        backgroundColor: "yellow"
    }
})

export default RecentsTab