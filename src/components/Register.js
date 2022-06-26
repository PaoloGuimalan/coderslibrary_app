import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ImgLogo from '../resources/imgs/book_img.png'
import IconFeather from 'react-native-vector-icons/Feather'
import Axios from 'axios'

const Register = ({navigation}) => {

  const [codereqLoader, setcodereqLoader] = useState(false);
  const [serverResponseMessage, setserverResponseMessage] = useState("");
  const [serverResponseCode, setserverResponseCode] = useState("");
  const [serverResponseStatus, setserverResponseStatus] = useState(false);
  const [pendingResponseLoader, setpendingResponseLoader] = useState(true);
  const [isVerified, setisVerified] = useState(false);

  //forms state
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [passwordMain, setpasswordMain] = useState("");
  const [passwordCon, setpasswordCon] = useState("");

  const codeVerifier = (codeValue) => {
    if(serverResponseCode != "" || serverResponseCode != 0){
      if(codeValue == serverResponseCode){
        setserverResponseStatus(true);
        setisVerified(true);
        setserverResponseMessage("Code is Matched!");
      }
      else{
        setserverResponseStatus(false);
        setserverResponseMessage("Code Incorrect!");
      }
    }
  }

  const codeRequestFetch = () => {
    setcodereqLoader(true)
    Axios.post('https://coderslibraryserver.herokuapp.com/sendMailCode', {
      email: email
    }).then((response) => {
      if(response.data.status){
        setserverResponseMessage(response.data.message)
        setserverResponseCode(response.data.code)
        setserverResponseStatus(response.data.status);
        setpendingResponseLoader(false)
      }
      else{
        setserverResponseMessage(response.data.message)
        setserverResponseStatus(response.data.status);
        setpendingResponseLoader(false)
      }
    }).catch((err) => {
        setserverResponseMessage("Cannot connect to Server!")
        setserverResponseStatus(false);
        setpendingResponseLoader(false)
    })
  }

  const verifiedRegistrationData = (verifiedData) => {
    Axios.post('https://coderslibraryserver.herokuapp.com/createAccount', verifiedData).then((response) => {
      //initiate response
      if(response.data.status){
        alert(response.data.message);
        navigation.navigate("Login")
      }
      else{
        alert(response.data.message);
      }
    }).catch((err) => {
      //alert error
      alert(err);
    })
  }

  const submitRegister = () => {
    const dataToTransmit = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordMain
    }

    if(passwordMain == passwordCon){
      if(passwordMain != "" && passwordCon != ""){
        if(firstName == "" || lastName == "" || email == "" || !isVerified){
          alert("Please provide all fields");
        }
        else if(firstName == ""){
          alert("First Name Empty!")
        }
        else if(lastName == ""){
          alert("Last Name Empty!")
        }
        else if(email == ""){
          alert("Email Empty!")
        }
        else if(!isVerified){
          alert("Verification Code is either do not match or not provided!")
        }
        else{
          // alert("Good!");
          verifiedRegistrationData(dataToTransmit)
        }
      }
      else{
        alert("Password Empty!")
      }
    }
    else{
      alert("Password not Matched!");
    }
    // console.log(dataToTransmit)
  }

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
          <TextInput placeholder='First Name' style={styles.inputsRegister} onChangeText={(e) => { setfirstName(e) }} />
          <TextInput placeholder='Last Name' style={styles.inputsRegister} onChangeText={(e) => { setlastName(e) }}/>
          <TextInput placeholder='Email' style={styles.inputsEmail} onChangeText={(e) => { setemail(e) }} />
          <View style={styles.inputsCode}>
            <TextInput placeholder='Email Verification Code' style={styles.inputEmailCode} onChangeText={(e) => { codeVerifier(e) }} />
            <TouchableOpacity onPress={() => { codeRequestFetch() }} disabled={codereqLoader}>
              <View style={styles.viewSendCode}>
                <IconFeather name='send' size={20} />
              </View>
            </TouchableOpacity>
          </View>
          {codereqLoader? (
            pendingResponseLoader?(
              <Text style={styles.pendingEmailCode}>Generating and Sending Code...</Text>
            ) : (
              serverResponseStatus? (
                <Text style={styles.responseEmailNoteTrue}>{serverResponseMessage}</Text>
              ) : (
                <Text style={styles.responseEmailNoteFalse}>{serverResponseMessage}</Text>
              )
            )
          ) : (
            <Text style={styles.noteEmailCode}>Note: Click the send button to receive a code at your inputted Email above.</Text>
          )}
          <TextInput placeholder='Password' style={styles.inputsRegister} secureTextEntry={true} onChangeText={(e) => { setpasswordMain(e) }} />
          <TextInput placeholder='Confirm Password' style={styles.inputsRegister} secureTextEntry={true} onChangeText={(e) => { setpasswordCon(e) }} />
          <TouchableOpacity onPress={() => { submitRegister() }}>
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
    marginBottom: 5,
    flex: 1,
    flexDirection: "row"
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
  },
  viewSendCode:{
    backgroundColor: "grey",
    width: 45,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  inputEmailCode:{
    width: 205,
    textAlign: "center"
  },
  noteEmailCode:{
    marginBottom: 25,
    width: "100%",
    backgroundColor: "white",
    maxWidth: 250,
    textAlign: "justify",
    fontSize: 13,
    color: "orange"
  },
  pendingEmailCode:{
    marginBottom: 25,
    width: "100%",
    backgroundColor: "white",
    maxWidth: 250,
    textAlign: "justify",
    fontSize: 13,
    color: "orange"
  },
  responseEmailNoteTrue:{
    marginBottom: 25,
    width: "100%",
    backgroundColor: "white",
    maxWidth: 250,
    textAlign: "justify",
    fontSize: 13,
    color: "green"
  },
  responseEmailNoteFalse:{
    marginBottom: 25,
    width: "100%",
    backgroundColor: "white",
    maxWidth: 250,
    textAlign: "justify",
    fontSize: 13,
    color: "red"
  }
})

export default Register