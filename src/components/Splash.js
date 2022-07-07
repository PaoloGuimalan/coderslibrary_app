import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import ImgLogo from '../resources/imgs/book_img.png'
import * as Animatable from 'react-native-animatable'

const Splash = ({navigation}) => {
 
  useEffect(() => {
    // setTimeout(() => {
    //     navigation.navigate("Home")
    // }, 3000)
  }, [])

  const pulsing = {
    from:{
      scale: 1
    },
    to:{
      scale: 1.1
    }
  }

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Animatable.Image animation="rotate" duration={1000} delay={500} iterationDelay={500} iterationCount="infinite" easing="ease-out" source={ImgLogo} style={styles.logoSizing}/>
      <Text style={styles.textLabel}>Coder's Library</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    logoSizing:{
      width: 100,
      height: 100,
      marginBottom: 10
    },
    textLabel:{
      fontSize: 20,
      fontFamily: "Roboto"
    }
})

export default Splash