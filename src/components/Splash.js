import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({navigation}) => {
 
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Home")
    }, 3000)
  }, [])

  return (
    <View style={styles.mainView}>
      <Text>Coder's Library</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    }
})

export default Splash