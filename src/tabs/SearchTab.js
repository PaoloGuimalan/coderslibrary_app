import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useTransition } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'

const SearchTab = () => {

  const [searchValue, setsearchValue] = useState("");
  const [searchinitialized, setsearchinitialized] = useState(false);
  // const [isPending, startTransition] = useTransition()

  const searchEnabler = (e) => {
    // startTransition(() => {
    //   setsearchValue(e)
    // })
    setsearchValue(e)
  }

  const submitClicked = () => {
    alert(searchValue)
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.textLabelSearch}>Search Books</Text>
      <View style={styles.viewSearchBox}>
        <View style={styles.flexSearchBox}>
          <IconIon name='search' size={25} style={styles.iconSearch} />
          <TextInput placeholder='Type anything....' style={styles.inputSearch} onChangeText={(e) => { searchEnabler(e) }} onSubmitEditing={() => { submitClicked() }}/>
        </View>
      </View>
      {searchinitialized? (
        <View>
          <Text>Hello World</Text>
        </View>
      ) : (
        <View style={styles.viewNoSearch}>
          <ScrollView style={styles.scrollNoSearch} contentContainerStyle={styles.containerscrollNoSearch}>
            <View style={styles.viewNoSearchDisplay}>
              <View style={styles.viewFlexedNoSearch}>
                <IconMCI name='cloud-search-outline' size={100} />
                <Text style={styles.textLabelNoSearch}>Search something</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainView:{
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  textLabelSearch:{
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10
  },
  viewSearchBox:{
    borderWidth: 1,
    height: 45,
    width: "90%",
    maxWidth: 280,
    borderRadius: 45,
    borderColor: "#4d4d4d",
    flex: 0,
    marginBottom: 15
  },
  flexSearchBox:{
    flex: 1,
    flexDirection: "row"
  },
  iconSearch:{
    backgroundColor: "transparent",
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 5
  },
  inputSearch:{
    backgroundColor: "transparent",
    width: 220
  },
  viewNoSearch:{
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  scrollNoSearch:{
    paddingBottom: 0
  },
  containerscrollNoSearch:{
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 300
  },
  viewNoSearchDisplay:{
    borderWidth: 0,
    width: 150,
    height: 150,
    marginTop: 50
  },
  viewFlexedNoSearch:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textLabelNoSearch:{
    fontSize: 13
  }
});

export default SearchTab