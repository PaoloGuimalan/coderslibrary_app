import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const TagsTab = () => {
  return (
    <View style={styles.mainView}>
      <Text>TagsTab</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: width,
        backgroundColor: "green"
    }
})

export default TagsTab