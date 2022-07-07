import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ACTIVITY_COMMENTS } from '../../redux/types/types';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window")

const TagsTab = () => {

  const activitycomments = useSelector(state => state.activitycomments);
  const dispatch = useDispatch()

  const [loadingState, setloadingState] = useState(true);
  const [NoNetwork, setNoNetwork] = useState(false);

  const navigation = useNavigation()

  useEffect(() => {
    getActivityComments()
  },[])

  const getActivityComments = async () => {
    setloadingState(true);
    setNoNetwork(false);
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get('https://coderslibraryserver.herokuapp.com/getActivityComments', {
        headers:{
          "x-access-token": resp
        }
      }).then((response) => {
        //dispatch response
        dispatch({type: SET_ACTIVITY_COMMENTS, activitycomments: response.data})
        setloadingState(false)
      }).catch((err) => {
        //alert error
        setNoNetwork(true);
        setloadingState(false)
      })
    })
  }

  const bookPointer = async (bookID) => {
    // alert(bookID)
    await AsyncStorage.getItem('token').then((resp) => {
      Axios.get(`https://coderslibraryserver.herokuapp.com/getBookInfo/${bookID}/${null}`, {
          headers: {
              "x-access-token": resp
          }
      }).then((response) => {
          //dispatch data
          // console.log(response.data.bookInfo.link_dl)
          navigation.navigate("ViewBook", { url: response.data.bookInfo.link_dl, bookID: response.data.bookInfo.id })
      }).catch((err) => {
          //alert error
          // alert("Unable to load Recents");
      })
  })
  }

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Tags &#38; Comments</Text>
        {loadingState? (
          <Animatable.View animation="rotate" duration={1000} delay={100} iterationDelay={0} iterationCount="infinite" easing="ease-out" style={styles.viewNoSearchDisplay}>
            <View style={styles.viewFlexedNoSearch}>
              <IconAntDesign name='loading1' size={30} />
            </View>
          </Animatable.View>
        ) : (
          NoNetwork? (
            <View style={styles.viewNoSearchDisplay}>
                <View style={styles.viewFlexedNoSearch}>
                  <IconFeather name='wifi-off' size={80} />
                  <Text style={styles.textLabelNoSearch}>No Network</Text>
                  <TouchableOpacity onPress={() => { getActivityComments() }}>
                    <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </View>
          ) : (
            activitycomments.comments.length == 0 && activitycomments.mentionsYou.length == 0? (
              <View style={styles.viewNoSearchDisplay}>
                  <View style={styles.viewFlexedNoSearch}>
                    <IconMCI name='comment-off-outline' size={80} />
                    <Text style={styles.textLabelNoSearch}>No Comments yet.</Text>
                    <TouchableOpacity onPress={() => { getActivityComments() }}>
                      <Text style={{marginTop: 20, color: "#4a4a4a", textDecorationLine: "underline"}}>Reload</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            ) : (
              <View style={styles.viewSections}>
                {activitycomments.comments.length == 0? (
                  <View></View>
                ) : (
                  <View style={styles.viewcomments}>
                    <Text style={styles.sectionLabels}>Your Comments</Text>
                    {activitycomments.comments.map((cmts, i) => {
                      return(
                        <TouchableOpacity onPress={() => {bookPointer(cmts.bookID)}} key={i} style={{width: "100%", alignItems: "center"}}>
                          <View style={styles.viewindvComments}>
                          <View style={styles.viewUserName}>
                            <Text style={styles.textFullName}>{cmts.fullName}</Text><Text> | </Text><Text style={styles.textUserName}>@{cmts.userName}</Text>
                          </View>
                          <View style={styles.viewContent}>
                            {cmts.content.split(" ").map((strand, j) => {
                              if(cmts.mentions.indexOf(strand.slice(1)) > -1){
                                  return(
                                    <Text key={j} style={styles.textMentionDisplay}>{`${strand} `}</Text>
                                  )
                                }
                                else{
                                  return(
                                    <Text key={j}>{`${strand} `}</Text>
                                  )
                                }
                              })}
                            </View>
                            <View style={styles.viewUserName}>
                              <Text style={styles.textDateDisplayed}>{cmts.dateposted}</Text><Text style={styles.textDateDisplayed}> | </Text><Text style={styles.textDateDisplayed}>{cmts.timeposted}</Text>
                           </View>
                         </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                )}
                {activitycomments.mentionsYou.length == 0? (
                  <View></View>
                ) : (
                  <View style={styles.viewcomments}>
                    <Text style={styles.sectionLabels}>Tags</Text>
                    {activitycomments.mentionsYou.map((cmts, i) => {
                      return(
                        <TouchableOpacity onPress={() => {bookPointer(cmts.bookID)}} key={i} style={{width: "100%", alignItems: "center"}}>
                          <View style={styles.viewindvComments} key={i}>
                          <View style={styles.viewUserName}>
                            <Text style={styles.textFullName}>{cmts.fullName}</Text><Text> | </Text><Text style={styles.textUserName}>@{cmts.userName}</Text>
                          </View>
                          <View style={styles.viewContent}>
                            {cmts.content.split(" ").map((strand, j) => {
                              if(cmts.mentions.indexOf(strand.slice(1)) > -1){
                                  return(
                                    <Text key={j} style={styles.textMentionDisplay}>{`${strand} `}</Text>
                                  )
                                }
                                else{
                                  return(
                                    <Text key={j}>{`${strand} `}</Text>
                                  )
                                }
                              })}
                            </View>
                            <View style={styles.viewUserName}>
                              <Text style={styles.textDateDisplayed}>{cmts.dateposted}</Text><Text style={styles.textDateDisplayed}> | </Text><Text style={styles.textDateDisplayed}>{cmts.timeposted}</Text>
                           </View>
                         </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                )}
              </View>
            )
          )
        )}
        {/* <View style={styles.viewSections}>
          <Text style={styles.sectionLabels}>Your Comments</Text>
        </View>
        <View style={styles.viewSections}>
          <Text style={styles.sectionLabels}>Tags</Text>
        </View> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        width: "100%",
        backgroundColor: "white",
        flexGrow: 1
    },
    mainLabel:{
      fontSize: 20,
      margin: 10,
      fontWeight: "bold"
    },
    sectionLabels:{
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10
    },
    viewSections:{
      width: "90%",
      alignSelf: "center",
      marginBottom: 10
    },
    viewNoSearchDisplay:{
      borderWidth: 0,
      width: 150,
      height: 150,
      marginTop: 50,
      alignSelf: "center"
    },
    viewFlexedNoSearch:{
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    viewcomments:{
      backgroundColor: "white",
      marginBottom: 10,
      alignItems: "center"
    },
    viewindvComments:{
      backgroundColor: "#dedede",
      width: "90%",
      maxWidth: 320,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
  },
  viewUserName:{
      flex: 1,
      flexDirection: "row"
  },
  textFullName:{
      fontSize: 15,
      fontWeight: "bold"
  },
  textUserName:{
      fontSize: 12,
      textAlignVertical: "center",
      color: "#acacac"
  },
  textContentComment:{
      textAlign: "justify",
      marginTop: 7,
      marginBottom: 5
  },
  textDateDisplayed:{
      fontSize: 12,
      color: "#acacac"
  },
  viewContent:{
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  textMentionDisplay:{
    backgroundColor: "grey", 
    color: "white", 
    marginRight: 2, 
    marginTop: 2, 
    borderRadius: 2, 
    paddingLeft: 2, 
    paddingRight: 2
}
})

export default TagsTab