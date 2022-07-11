import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")

const InfosTab = () => {
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Account</Text>
        <View style={styles.viewNoSearchDisplay}>
            <View style={styles.viewFlexedNoSearch}>
              <IconMCI name='account-circle-outline' size={120} color="#bfbfbf" />
              <Text style={{marginTop: 5, fontSize: 17, marginBottom: 15, color: "#bfbfbf"}}>Comming Soon!</Text>
            </View>
        </View>
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
  viewRecents:{
    backgroundColor: "white",
    flex: 0
  },
  flexedRecents:{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  imgSizing:{
    width: 150,
    height: 200,
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  recentsIndvView:{
    margin: 5,
    backgroundColor: "#a3a3a3",
    height: 280,
    borderWidth: 0,
    borderColor: "grey",
    borderRadius: 5
  },
  bookName:{
    width: 130,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
    height: 40
  },
  viewIconsNav:{
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  viewIconTouch:{
    backgroundColor: "transparent",
    width: 50,
    height: 35,
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  openTextBook:{
    textAlignVertical: "center",
    marginBottom: 3
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
  }
})

export default InfosTab