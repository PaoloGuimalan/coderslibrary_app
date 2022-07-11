import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import ImgLogo from '../resources/imgs/book_img.png'

const Help = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.containerScrollViewStyle}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
            <View style={styles.viewIcon}>
            <View style={styles.viewIconFlexed}>
                <Image source={ImgLogo} style={styles.imageLogoSizing} />
                <Text style={styles.textIconSizing}>Coder's Library</Text>
            </View>
            </View>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginBottom: 5, fontWeight: "bold"}}>Help &#38; Guides</Text>
        <View style={styles.viewHelp}>
            <Text style={{textAlign: "justify", marginBottom: 10}}>
              Coder's Library were created mainly for sharing our team's gathered books. During the pandemic we as learners also struggle to find enough resources for us to learn more about Programming, Coding and other IT based books and topics. Our team began collecting free pdf books so that we can easily share them as a whole.
            </Text>
            <Text style={{textAlign: "justify", marginBottom: 20}}>
              Our project started in September 2021 and hopefully will become progressive. Coder's Library is here to help learners to attain resources/books that are needed for them to attain their best capacity in learning, specifically in Coding and Programming. Supporting our project will help us improve our services more and probably expand our platform to attain wider range of topics and resources.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Registration</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Registration will require only few informations from Unregistered User. These informations are 
              First Name, Last Name, Email, Verification Code and Password. You need to ensure that you provide 
              a legitimate and accessible email address so that you can retrieve the verification code that will 
              be sent.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Saved Books</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Saved Books are saved in the Server which will help you access it in different devices using your account. 
              It is different from downloading and saving bookmarks which is only in Local Storage. This will allow you to 
              save your desired book for later.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Downloaded Books</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 5, textAlign: "justify"}}>
              Downloaded Books are accessible offline which means instead of accessing the Books with the server which requires 
              a stable connection. These books will be donwloaded and saved locally which will appear in the Downloads Section of the 
              App. Using these feature will allow you to use the App in Offline Mode.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Bookmarks</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Bookmarks unlike the Saves feature, these are saved also in Local Storage which is unsharable to 
              other devices even if using the same account. You can somehow use this feature to save bookmarks from 
              a specific book without having an account. It allows you to save a book with or without label of bookmark. 
              The Label will be automatically labeled as "Not Applied" if Bookmark Label not provided.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Book Offline and Online Mode</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              There are different ways of accessing books, these are in Online and Offline mode. Online Mode allows you 
              to Save, Download, Share Link of a Book and Open the Book in Browser. It also have a comment section where you can 
              comment or mention someone for you to point them on a specific book. Offline Mode somehow is when you download a 
              book which only have a bookmark feature. Overall even if you are in Online or Offline Mode, these have same features 
              in bookmarking pages in a book.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Recents</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Recents Section is similar to a History Section where you can browse your recently browsed or viewed books. 
              This will help you if you forgot what book you viewed earlier allows you to find it their.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Tags</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Tags Section is where you can find your comments and tags/mentions in different books and by clicking it 
              allows you to be redirected on which book the comment is located. This can serve also as a feature similar 
              in Saving a Book. You can mention or tag someone by typing their Username with an "@" symbol before it.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Notifications</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              The Notifications Section allows you to view and notify you about updates in the app or if someone mentions 
              you in a comment. This coexist with the comment feature where it is the end point of the communication from 
              different Users.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Search Tab</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
              Search Tab is where you can search Books or even Categories so that using the App is as easy as 
              using Google, no endless browsing by just few clicks in searching. The Searches will display several 
              results realted to your search and not just specified in what you typed.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>Books Tab</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 30, textAlign: "justify"}}>
              This Tab serves as an Open Library where if you do not want to use Search Tab, you can 
              just browse all the books in this section to find or even discover different books by just 
              scrolling through.
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 30}}>
              © Coder's Library 2022
            </Text>
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
  viewHelp:{
      backgroundColor: "white",
      marginTop: 10,
      width: "90%",
      maxWidth: 700
  },
  viewIcon:{
      backgroundColor: "black",
      height: 50,
      width: 170,
      marginTop: 25,
      borderRadius: 10,
      marginBottom: 20
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
    scrollViewStyle:{
      backgroundColor: "transparent",
      width: "100%"
    },
    containerScrollViewStyle:{
      flexGrow: 1,
      alignItems: "center"
    }
})

export default Help