import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const InfosTab = () => {
  return (
    <View style={styles.mainView}>
      <Text>InfosTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: width,
        backgroundColor: "orange"
    }
})

export default InfosTab