import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import ImgLogo from '../resources/imgs/book_img.png'

const Login = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
        <View style={styles.viewIconLogo}>
            <Image source={ImgLogo} style={styles.logoSizing}/>
            <Text style={styles.textLabel}>Coder's Library</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.viewFormLogin}>
        <Text style={styles.mainLabelLogin}>Login</Text>
        <TextInput placeholder='Email' style={styles.inputBoxes} />
        <TextInput placeholder='Password' style={styles.inputBoxes} secureTextEntry={true} />
        <TouchableOpacity>
            <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
        <View style={styles.noteIndicator}>
            <View style={styles.noteIndicatorFlex}>
                <Text>Do not have an account? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                    <Text style={styles.registerIndicator}>register here.</Text>
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