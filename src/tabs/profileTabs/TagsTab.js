import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const TagsTab = () => {
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Text style={styles.mainLabel}>Tags &#38; Comments</Text>
        <View style={styles.viewSections}>
          <Text style={styles.sectionLabels}>Your Comments</Text>
        </View>
        <View style={styles.viewSections}>
          <Text style={styles.sectionLabels}>Tags</Text>
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
    sectionLabels:{
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10
    },
    viewSections:{
      width: "90%",
      alignSelf: "center",
      marginBottom: 10
    }
})

export default TagsTab