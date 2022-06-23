import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ImgLogo from '../resources/imgs/book_img.png'

const Register = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.mainScrollView} contentContainerStyle={styles.mainScrollViewContent}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
          <View style={styles.viewIcon}>
            <View style={styles.viewIconFlexed}>
              <Image source={ImgLogo} style={styles.imageLogoSizing} />
              <Text style={styles.textIconSizing}>Coder's Library</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.mainNoteRegister}>Having an account in Coder's Library allows you to save numbers of book in your account as a list or even save a whole category instead. Your account will also allow you to tag and notify others books that you may want to suggest to them.</Text>
        <Text style={styles.mainLabelRegister}>Register</Text>
        <View style={styles.viewFormRegister}>
          <TextInput placeholder='First Name' style={styles.inputsRegister} />
          <TextInput placeholder='Last Name' style={styles.inputsRegister} />
          <TextInput placeholder='Email' style={styles.inputsEmail} />
          <TextInput placeholder='Email Verification Code' style={styles.inputsCode} />
          <TextInput placeholder='Password' style={styles.inputsRegister} secureTextEntry={true} />
          <TextInput placeholder='Confirm Password' style={styles.inputsRegister} secureTextEntry={true} />
          <TouchableOpacity>
            <Text style={styles.textButtonSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noteIndicator}>
            <View style={styles.noteIndicatorFlex}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                    <Text style={styles.registerIndicator}>Login here.</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView:{
    backgroundColor: "white",
    flex: 1,
    alignItems: "center"
  },
  mainLabelRegister:{
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },
  mainNoteRegister:{
    textAlign: "justify",
    width: "90%",
    maxWidth: 300,
    marginTop: 20
  },
  mainScrollView:{
    flexGrow: 1,
    backgroundColor: "white",
    width: "100%"
  },
  mainScrollViewContent:{
    alignItems: "center"
  },
  viewIcon:{
    backgroundColor: "black",
    height: 50,
    width: 170,
    marginTop: 25,
    borderRadius: 10
  },
  imageLogoSizing:{
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5
  },
  viewIconFlexed:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textIconSizing:{
    fontSize: 17,
    marginLeft: 5,
    color: "white"
  },
  inputsRegister:{
    borderWidth: 1,
    borderColor: "#adadad",
    height: 45,
    width: "100%",
    backgroundColor: "#adadad",
    maxWidth: 250,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10
  },
  inputsEmail:{
    borderWidth: 1,
    borderColor: "#adadad",
    height: 45,
    width: "100%",
    backgroundColor: "#adadad",
    maxWidth: 250,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 25
  },
  inputsCode:{
    borderWidth: 1,
    borderColor: "#adadad",
    height: 45,
    width: "100%",
    backgroundColor: "#adadad",
    maxWidth: 250,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 25
  },
  viewFormRegister:{
    backgroundColor: "white",
    width: "90%",
    maxWidth: 300,
    alignItems: "center"
  },
  textButtonSubmit:{
    backgroundColor: "black",
    color: "white",
    width: 120,
    height: 35,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 5,
    marginTop: 10
  },
  noteIndicator:{
      backgroundColor: "white",
      marginTop: 15,
      width: "90%",
      height: 50,
      flex: 0
  },
  noteIndicatorFlex:{
      flex: 1,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "center"
  },
  registerIndicator:{
    textDecorationLine: "underline"
  }
})

export default Register