import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ImgLogo from '../resources/imgs/book_img.png'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACCOUNT, SET_PROFILE } from '../redux/types/types';
import * as Animatable from 'react-native-animatable'

const Login = ({navigation}) => {

  const [emailPrompt, setemailPrompt] = useState("");
  const [passwordPrompt, setpasswordPrompt] = useState("");

  const [loadingState, setloadingState] = useState(false);

  const dispatch = useDispatch()

  const loginInit = () => {
    //Login access to server
    if((emailPrompt == "" && passwordPrompt != "") || (emailPrompt != "" && passwordPrompt == "")){
        if(emailPrompt == ""){
            alert("Email is Empty!");
        }
        else if(passwordPrompt == ""){
            alert("Password is Empty!")
        }
        else{
            alert("Please ensure all fields are filled up!")
        }
    }
    else if(emailPrompt == "" && passwordPrompt == ""){
        alert("All fields are Empty!")
    }
    else{
        setloadingState(true);
        Axios.post('https://coderslibraryserver.herokuapp.com/userLogin', {
            email: emailPrompt,
            password: passwordPrompt
        }).then( async (response) => {
            //response login
            // console.log(response.data)
            if(response.data.status){
                // alert(response.data.message)
                await AsyncStorage.setItem('token', response.data.token)
                dispatch({type: SET_ACCOUNT, account: {status: true, token: response.data.token, userName: response.data.userName}})
                fetchProfile(response.data.token)
                navigation.navigate("Home");
            }
            else{
                setloadingState(false)
                alert(response.data.message)
            }
        }).catch((err) => {
            //alert login failed
            setloadingState(false)
            alert("Cannot connect to server!")
        })
    }
  }

  const fetchProfile = async (token) => {
    Axios.get('https://coderslibraryserver.herokuapp.com/userProfileDetails', {
        headers: {
          "x-access-token": token
        }
      }).then((response) => {
        // console.log(response.data)
        dispatch({type: SET_PROFILE, profile: response.data})
      }).catch((err) => {
        //dispatch state error
      })
  }

  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
        <View style={styles.viewIconLogo}>
            {loadingState? (
                <Animatable.Image animation="rotate" duration={1000} delay={500} iterationDelay={500} iterationCount="infinite" easing="ease-out" source={ImgLogo} style={styles.logoSizing}/>
            ) : (
                <Image source={ImgLogo} style={styles.logoSizing}/>
            )}
            <Text style={styles.textLabel}>Coder's Library</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.viewFormLogin}>
        <Text style={styles.mainLabelLogin}>Login</Text>
        <TextInput placeholder='Email' style={styles.inputBoxes} onChangeText={(e) => { setemailPrompt(e) }} />
        <TextInput placeholder='Password' style={styles.inputBoxes} secureTextEntry={true} onChangeText={(e) => { setpasswordPrompt(e) }} />
        <TouchableOpacity onPress={() => { loginInit() }}>
            <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
        <View style={styles.noteIndicator}>
            <View style={styles.noteIndicatorFlex}>
                <Text>Do not have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                    <Text style={styles.registerIndicator}>Register here.</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    logoSizing:{
        width: 80,
        height: 80,
        marginBottom: 5
    },
    textLabel:{
        fontSize: 15,
        fontFamily: "Roboto"
    },
    viewIconLogo:{
        backgroundColor: "white",
        alignItems: "center"
    },
    viewFormLogin:{
        backgroundColor: "white",
        width: "90%",
        maxWidth: 290,
        marginTop: 25,
        alignItems: "center"
    },
    mainLabelLogin:{
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    inputBoxes:{
        borderWidth: 1,
        borderColor: "#adadad",
        width: "90%",
        height: 45,
        borderRadius: 5,
        backgroundColor: "#adadad",
        maxWidth: 290,
        textAlign: "center",
        marginBottom: 10
    },
    textButtonLogin:{
        backgroundColor: "black",
        width: 120,
        textAlign: "center",
        height: 35,
        textAlignVertical: "center",
        borderWidth: 1,
        borderColor: "#adadad",
        borderRadius: 5,
        marginTop: 10,
        color: "white"
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

export default Login