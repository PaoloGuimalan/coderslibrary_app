import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconFeather from 'react-native-vector-icons/Feather'
import IconOcti from 'react-native-vector-icons/Octicons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SET_ACCOUNT, SET_PROFILE, SET_RECENTS } from '../redux/types/types'
import Axios from 'axios'
import RecentsTab from '../tabs/profileTabs/RecentsTab'
import TagsTab from '../tabs/profileTabs/TagsTab'
import SavesTab from '../tabs/profileTabs/SavesTab'
import DownloadsTab from '../tabs/profileTabs/DownloadsTab'
import InfosTab from '../tabs/profileTabs/InfosTab'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

const { width, height } = Dimensions.get("window");

const MiniTab = createNativeStackNavigator()

const Profile = ({route, navigation: { goBack, navigate }}) => {

  const dispatch = useDispatch()
  const account = useSelector(state => state.account);
  const profile = useSelector(state => state.profile);

  useEffect(() => {
    // console.log(route)
    fetchRecents()
    fetchProfile()
  }, [])

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
      })
    })
  }

  const fetchRecents = async () => {
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/userRecentsList', {
        headers: {
          "x-access-token": resp
        }
      }).then((response) => {
        // console.log(response.data)
        dispatch({type: SET_RECENTS, recents: response.data})
      }).catch((err) => {
        //dispatch state error
      })
    })
  }

  const logoutTrigger = () => {
    // alert("Logout")
    AsyncStorage.removeItem('token').then(() => {
      dispatch({type: SET_ACCOUNT, account: {
          status: false,
          token: null,
          userName: null
      }})
      navigate("Home")
    })
  }

  const [rotationState, setrotationState] = useState(true);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        setrotationState(true)
      } else {
        setrotationState(false)
      }
    })
  }, [])

  return (
    <View style={styles.mainView}>
      <View style={styles.navBar}>
        <View style={styles.flexBar}>
          <TouchableOpacity onPress={() => { goBack() }}>
            <View style={styles.viewBackButton}>
                <IconIon name='ios-chevron-back-outline' size={25} />
                <Text>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.flexViewMiddleBar}>
            <Text style={styles.screenMainLabel}>Profile{rotationState? "" : ` | ${profile.userName}`}</Text>
          </View>
          <TouchableOpacity onPress={() => { logoutTrigger() }}>
            <View style={styles.viewBackButton}>
                <Text style={styles.textLabelLogout}>Logout</Text>
                <IconIon name='log-out-outline' size={25} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollViewSizing} contentContainerStyle={styles.scrollViewFlex} stickyHeaderIndices={[1]}>
        {rotationState? (
          <View style={styles.viewProfileMain}>
            <View style={styles.flexViewProfileMain}>
              <IconIon name='person-circle-outline' size={100} color="#4d4d4d" />
              <View>
                <Text numberOfLines={1} style={styles.textFullName}>{profile.firstName} {profile.lastName}</Text>
                <Text style={styles.textUserName}>@{profile.userName}</Text>
              </View>
            </View>
          </View>
        ):(
          <View></View>
        )}
        <View style={styles.viewCountDetails}>
          <View style={styles.viewCountDetailsFlex}>
            <TouchableOpacity onPress={() => { navigate("RecentsTab") }}>
              <View style={styles.indivCountDetails}>
                <IconMCI name='history' size={30} />
                <Text style={styles.textCountsDetails}>Recents</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigate("TagsTab") }}>
              <View style={styles.indivCountDetails}>
                <IconOcti name='comment-discussion' size={26} />
                <Text style={styles.textCountsDetails}>Tags</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigate("SavesTab") }}>
              <View style={styles.indivCountDetails}>
                <IconIon name='heart' size={27} />
                <Text style={styles.textCountsDetails}>Saves</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigate("DownloadsTab") }}>
              <View style={styles.indivCountDetails}>
                <IconFeather name='download' size={30} />
                <Text style={styles.textCountsDetails}>Downloads</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigate("InfosTab") }}>
              <View style={styles.indivCountDetails}>
                <IconEnt name='dots-three-horizontal' size={30} />
                <Text style={styles.textCountsDetails}>Infos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal snapToInterval={width} decelerationRate="fast" contentContainerStyle={styles.scrollContainerProfile}>
          {/* <RecentsTab />
          <TagsTab />
          <SavesTab />
          <DownloadsTab />
          <InfosTab /> */}
          <MiniTab.Navigator screenOptions={{gestureEnabled: true, animation: "slide_from_right"}}>
            <MiniTab.Screen name='RecentsTab' component={RecentsTab} options={{headerShown: false}} />
            <MiniTab.Screen name='TagsTab' component={TagsTab} options={{headerShown: false}} />
            <MiniTab.Screen name='SavesTab' component={SavesTab} options={{headerShown: false}} />
            <MiniTab.Screen name='DownloadsTab' component={DownloadsTab} options={{headerShown: false}} />
            <MiniTab.Screen name='InfosTab' component={InfosTab} options={{headerShown: false}} />
          </MiniTab.Navigator>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    navBar:{
        backgroundColor: "white",
        width: "100%",
        height: 50,
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#bfbfbf"
    },
    flexBar:{
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    viewBackButton:{
        backgroundColor: "white",
        width: 80,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    textLabelLogout:{
      marginRight: 5,
      color: "red"
    },
    flexViewMiddleBar:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    screenMainLabel:{
      fontSize: 17,
      fontWeight: "bold"
    },
    scrollViewFlex:{
      flexGrow: 1,
      backgroundColor: "white",
      alignItems: "center"
    },
    scrollViewSizing:{
      width: "100%"
    },
    viewProfileMain:{
      backgroundColor: "white",
      width: "100%",
      height: 150
    },
    flexViewProfileMain:{
      backgroundColor: "white",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row"
    },
    textFullName:{
      fontSize: 25,
      fontWeight: "bold"
    },
    textUserName:{
      fontSize: 15
    },
    viewCountDetails:{
      backgroundColor: "white",
      borderColor: "#ededed",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 60,
      width: "100%"
    },
    viewCountDetailsFlex:{
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row"
    },
    indivCountDetails:{
      margin: 2,
      borderWidth: 0,
      alignItems: 'center',
      width: 60
    },
    textCountsDetails:{
      fontSize: 13
    },
    textTester:{
      fontSize: 50
    },
    scrollContainerProfile:{
      flexGrow: 1,
      flexDirection: "row"
    },
    profileAccessViews:{
      backgroundColor: "aqua",
      width: width
    }
})

export default Profile