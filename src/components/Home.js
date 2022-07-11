import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, StatusBar, Platform, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeTab from '../tabs/HomeTab'
import BooksTab from '../tabs/BooksTab'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { BOOKS_LIST, SET_ACCESSIBILITIES, SET_ACCOUNT, SET_PROFILE } from '../redux/types/types'
import ImgBackground from '../resources/imgs/background_rn.jpg'
import ImgLogo from '../resources/imgs/book_img.png'
import SearchTab from '../tabs/SearchTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataProfile } from '../redux/actions/actions'
import { openDatabase } from 'react-native-sqlite-storage'
import DownloadsTab from '../tabs/profileTabs/DownloadsTab'
import DownloadsMain from '../tabs/DownloadsMain'
import * as Animatable from 'react-native-animatable'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import NotificationsTab from '../tabs/NotificationsTab'
import SettingsTab from '../tabs/SettingsTab'

const Tab = createNativeStackNavigator()

const db = openDatabase({
  name: "coderslibrary_db"
})

export default function Home({navigation}) {

  const [loginstatustester, setloginstatustester] = useState(false);

  const account = useSelector(state => state.account);
  const accessibilities = useSelector(state => state.accessibilities);
  const dispatch = useDispatch()

  useEffect(() => {
    checkTables()
    // createTablesBookPrevious()
    // createTableBookMarks()
    // dropTable()
    // deleteAll()
  },[])

  const deleteAll = () => {
    db.transaction(txn => {
      txn.executeSql(`DELETE FROM books`,[],
      (sqlTxn, res) => {
        if(res.rowsAffected > 0){
          if(Platform.OS === 'android'){
            ToastAndroid.show("Table cleared!", ToastAndroid.SHORT)
          }
          else{
              alert("Table cleared!")
          }
        }
      },
      (error) => {
        if(Platform.OS === 'android'){
          ToastAndroid.show("Error clearing Table!", ToastAndroid.SHORT)
        }
        else{
            alert("Error clearing Table!")
        }
      })
    })
  }

  const dropTable = () => {
    db.transaction(txn => {
      txn.executeSql(`DROP TABLE books; DROP TABLE bookprevious`,[],
      (sqlTxn, res) => {
        console.log("OK")
      },
      (error) => {
        console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
      })
    })
  }

  const insertBook = () => {
    db.transaction(txn => {
      txn.executeSql(`INSERT INTO books (bookID, bookName, bookPublisher, bookAuthor, bookPath, bookImg) VALUES (?,?,?,?,?,?)`,["22", "Testing", "MePub", "MeAuth", "file", "img"],
      (sqlTxn, res) => {
        // getBooksDB()
      },
      (error) => {
        console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
      })
    })
  }

  const getBooksDB = () => {
    db.transaction(txn => {
      txn.executeSql(`SELECT * FROM books`,[],
      (sqlTxn, res) => {
        console.log(res.rows.item(0).bookName)
      },
      (error) => {
        console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
      })
    })
  }

  const checkTables = () => {
    db.transaction(txn => {
      txn.executeSql(`SELECT DISTINCT tbl_name FROM sqlite_master where tbl_name='books'`,[], (sqlTxn, res) => {
        // console.log(res.rows.length)
        if(res.rows.length == 0){
          createTables()
          createTablesBookPrevious()
          createTableBookMarks()
        }
      },
      (error) => {
          console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
      })
    })
  }

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, bookID VARCHAR(20), bookName TEXT, bookPublisher TEXT, bookAuthor TEXT, bookPath TEXT, bookImg TEXT)`,
        [],
        (sqlTxn, res) => {
          // console.log("table created successfully");
          if(Platform.OS === 'android'){
            ToastAndroid.show("Database Initialized", ToastAndroid.SHORT)
          }
          else{
              alert("Database Initialized")
          }
        },
        error => {
          console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
        },
      );
    });
  };

  const createTablesBookPrevious = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS bookprevious (id INTEGER PRIMARY KEY AUTOINCREMENT, bookID VARCHAR(20), bookRecentPage VARCHAR(20));`,
        [],
        (sqlTxn, res) => {
          // console.log("table created successfully");
          if(Platform.OS === 'android'){
            ToastAndroid.show("Database Initialized", ToastAndroid.SHORT)
          }
          else{
              alert("Database Initialized")
          }
        },
        error => {
          console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
        },
      );
    });
  };

  const createTableBookMarks = () => {
    db.transaction(txn => {
      txn.executeSql(`CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, bookID VARCHAR(20), bookLabel TEXT, bookRecentPage VARCHAR(20));`,
      [],
      (sqlTxn, res) => {
        if(Platform.OS === 'android'){
          ToastAndroid.show("Database Initialized", ToastAndroid.SHORT)
        }
        else{
            alert("Database Initialized")
        }
      },
      (error) => {
          console.log("error on creating table " + error.message);
          if(Platform.OS === 'android'){
            ToastAndroid.show("Error Initializing Database!", ToastAndroid.SHORT)
          }
          else{
              alert("Error Initializing Database!")
          }
      })
    })
  }

  const storageAccountCheck = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/loginVerifier', {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
        if(response.data.status){
          dispatch({type: SET_ACCOUNT, account: {...response.data}})
          fetchProfile()
          setaccessibilitiesFunc()
        }
        else{
          dispatch({type: SET_ACCOUNT, account: {status: false, token: null, userName: null}})
          setaccessibilitiesFunc()
        }
      }).catch((err) => {
        //dispatch error
        dispatch({type: SET_ACCOUNT, account: {status: false, token: null, userName: null}})
        setaccessibilitiesFunc()
      })
      // console.log(resp);
    })
  }

  const setaccessibilitiesFunc = () => {
    dispatch({type: SET_ACCESSIBILITIES, accessibilities: false})
  }

  const fetchProfile = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/userProfileDetails', {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
        dispatch({type: SET_PROFILE, profile: response.data})
      }).catch((err) => {
        //dispatch state error
        dispatch({type: SET_PROFILE, profile: dataProfile})
      })
    })
  }

  useEffect(() => {
    storageAccountCheck()
  }, [])

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.viewNavBar}>
          <View style={styles.navBarFlex}>
            <View style={styles.logoFlexBar}>
              <Image source={ImgLogo} style={styles.logoNavBarIcon} />
              <Text style={styles.textIconLabelBar}>Coder's Library</Text>
            </View>
            {accessibilities? (
              <View style={styles.viewNavigationsBar}>
                <TouchableOpacity disabled={accessibilities}>
                  <View style={styles.viewAccountIcon}>
                    <View style={styles.flexedTagComments}>
                      <Animatable.View style={{backgroundColor: "transparent", width: "100%", alignItems: 'center'}} animation="rotate" duration={1000} delay={100} iterationDelay={0} iterationCount="infinite" easing="ease-out">
                        <IconAntDesign name='loading1' size={15} color="black" />
                      </Animatable.View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              account.status? (
                <View style={styles.viewNavigationsBar}>
                  <TouchableOpacity onPress={() => {navigation.navigate("NotificationsTab")}}>
                    <IconIon name='ios-notifications' size={30} color="#4d4d4d" style={styles.iconsNavBarList} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { navigation.navigate("Profile", {userName: account.userName}) }} disabled={accessibilities}>
                    <View style={styles.viewAccountIcon}>
                      <View style={styles.flexAccountIcon}>
                        <IconIon name='person-circle-outline' size={35} color="#4d4d4d" style={styles.accountIcon} />
                        <Text numberOfLines={1} style={styles.userLabelName}>{account.userName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.viewNavigationsBar}>
                  <IconIon name='help-circle-outline' size={35} color="#4d4d4d" style={styles.iconsNavBarList} />
                  <TouchableOpacity onPress={() => { navigation.navigate("Login") }} disabled={accessibilities}>
                    <View style={styles.viewAccountIcon}>
                      <View style={styles.flexSignUpIcon}>
                        <Text style={styles.userSignUp}>Sign Up | Log In</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </View>
        <View style={styles.scrollViewStyling}>
            <Tab.Navigator screenOptions={{gestureEnabled: true, animation: "slide_from_right"}}>
              <Tab.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}} />
              <Tab.Screen name="SearchTab" component={SearchTab} options={{headerShown: false}} />
              <Tab.Screen name="BooksTab" component={BooksTab} options={{headerShown: false}} />
              <Tab.Screen name="DownloadsMain" component={DownloadsMain} options={{headerShown: false}} />
              <Tab.Screen name="NotificationsTab" component={NotificationsTab} options={{headerShown: false}} />
              <Tab.Screen name="SettingsTab" component={SettingsTab} options={{headerShown: false}} />
            </Tab.Navigator>
        </View>
        <View style={styles.viewNav}>
          <TouchableOpacity onPress={() => {navigation.navigate("HomeTab")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='home' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("SearchTab")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='search' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("BooksTab")}}>
            <View style={styles.viewButtonMain}>
             <Icon name='book' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("DownloadsMain")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='bookmark' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("SettingsTab")}}>
            <View style={styles.viewButtonMain}>
              <Icon name='gear' size={25} color="grey" style={styles.iconsStyling} />
            </View>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    viewNavBar:{
      height: 50,
      backgroundColor: "white",
      paddingTop:0,
      width: "100%",
      borderBottomWidth: 1,
      borderColor: "#bfbfbf",
      elevation: 3,
    },
    navBarFlex:{
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      flexDirection: "row"
    }, 
    logoFlexBar:{
      backgroundColor: "white",
      width: "50%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    logoNavBarIcon:{
      width: 30,
      height: 30,
      marginLeft: 15,
      marginRight: 10
    },
    textIconLabelBar:{
      fontSize: 17,
      color: "black"
    },
    viewNavigationsBar:{
      width: "50%",
      backgroundColor: "white",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    accountIcon:{
      marginRight: 0
    },
    viewAccountIcon:{
      borderWidth: 1,
      borderColor: "grey",
      marginRight: 5,
      width: 100,
      height: 40,
      borderRadius: 20
    },
    flexAccountIcon:{
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    flexSignUpIcon:{
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    userLabelName:{
      backgroundColor: "white",
      width: 55,
      color: "#4d4d4d"
    },
    userSignUp:{
      width: 100,
      fontSize: 13,
      textAlign: "center",
      backgroundColor: "transparent"
    },
    iconsNavBarList:{
      margin: 5,
      marginTop: 5
    },  
    scrollViewStyling:{
      backgroundColor: "white",
      width: "100%",
      height: "100%"
    },
    scrollViewContainer:{
      flex: 0,
      alignItems: 'center'
    },
    viewNav:{
      height: 55,
      width: "70%",
      maxWidth: 250,
      flex: 1,
      alignItems: "center",
      position: "absolute",
      backgroundColor: "white",
      bottom: 20,
      borderRadius: 55,
      justifyContent: "center",
      flexDirection: "row",
      borderColor: "grey",
      borderWidth: 1.5
    },
    iconsStyling:{
      flex: 0,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: "transparent"
    },
    homeLabel:{
      fontSize: 20,
      margin: 10,
      marginTop: 15,
      color: "black",
      fontWeight: "700"
    },
    viewButtonMain:{
      backgroundColor: "transparent",
      height: "100%",
      flex: 1,
      justifyContent: "center",
      marginLeft: 1,
      marginRight: 1
    },
    flexedTagComments:{
      flex: 1,
      flexDirection: "row",
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center"
    }
})