import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useTransition } from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { SEARCH_BOOKS, SEARCH_CATEGORIES } from '../redux/types/types'

const SearchTab = ({navigation}) => {

  const [searchValue, setsearchValue] = useState("");
  const [searchinitialized, setsearchinitialized] = useState(false);
  // const [isPending, startTransition] = useTransition()

  const searchbookslist = useSelector(state => state.searchbookslist);
  const searchcategorieslist = useSelector(state => state.searchcategorieslist)
  const dispatch = useDispatch()

  const searchEnabler = (e) => {
    // startTransition(() => {
    //   setsearchValue(e)
    // })
    setsearchValue(e)
  }

  const submitClicked = async () => {
    // alert(searchValue)
    const searchBooksFetch = Axios.post('https://coderslibraryserver.herokuapp.com/searchBooks', { searchBooksValue: searchValue }).catch((err) => { dispatch({type: SEARCH_BOOKS, searchbookslist: []}) })
    const searchCategoryFetch = Axios.post('https://coderslibraryserver.herokuapp.com/searchCategory', { searchCategoryValue: searchValue }).catch((err) => { dispatch({type: SEARCH_CATEGORIES, searchcategorieslist: []}) })

    await Axios.all([searchBooksFetch, searchCategoryFetch]).then(
      Axios.spread((response1, response2) => {
        // console.log(response1.data);
        // console.log(response2.data)
        dispatch({type: SEARCH_BOOKS, searchbookslist: response1.data})
        dispatch({type: SEARCH_CATEGORIES, searchcategorieslist: response2.data})
        setsearchinitialized(true);
      })
    ).catch((err) => {
        dispatch({type: SEARCH_BOOKS, searchbookslist: []})
        dispatch({type: SEARCH_CATEGORIES, searchcategorieslist: []})
        setsearchinitialized(true);
    })
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
        <View style={styles.viewResults}>
          <ScrollView style={styles.scrollSearchResult} contentContainerStyle={styles.containerScrollResults}>
            {searchcategorieslist.length != 0? (
              <View style={styles.viewSearchedCategoryList}>
                <Text style={styles.textLabelResults}>Categories</Text>
                <ScrollView contentContainerStyle={styles.scrollViewSectionsBooksResults} horizontal>
                  {searchcategorieslist.map((items, i) => {
                    return(
                      <TouchableOpacity key={i} onPress={() => {navigation.navigate("ViewCategory", { catname: items.category })}}>
                        <View style={styles.viewIndividualResult}>
                          <Image source={{uri: items.img_prev}} style={styles.individualImage} />
                          <Text numberOfLines={2} style={styles.textindividualLabels}>{items.category}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            ) : (
              <Text></Text>
            )}
            {searchbookslist.length != 0? (
              <View style={styles.viewSearchedCategoryList}>
                <Text style={styles.textLabelResults}>Books</Text>
                <View style={styles.viewSectionsBooksResults}>
                  {searchbookslist.map((items, i) => {
                    return(
                      <TouchableOpacity key={i} onPress={() => {navigation.navigate("ViewBook", { url: items.link_dl })}}>
                        <View style={styles.viewIndividualResult}>
                          <Image source={{uri: items.link_img}} style={styles.individualImage} />
                          <Text numberOfLines={2} style={styles.textindividualLabels}>{items.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            ) : (
              <Text></Text>
            )}
          </ScrollView>
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
  },
  viewSearchedCategoryList:{
    backgroundColor: "white",
    width: "100%",
    marginBottom: 20
  },
  scrollSearchResult:{
    backgroundColor: "white"
  },
  containerScrollResults:{
    flexGrow: 1,
    flexDirection: "column",
    paddingBottom: 250
  },
  viewResults:{
    width: "95%"
  },
  viewSectionsBooksResults:{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textLabelResults:{
    marginBottom: 15,
    fontSize: 20,
    marginLeft: 15
  },
  viewIndividualResult:{
    borderWidth: 0,
    width: 150,
    height: 240,
    margin: 5,
    flex: 0,
    alignItems: "center"
  },
  individualImage:{
    width: 150,
    height: 200
  },
  textindividualLabels:{
    textAlign: "center"
  },
  scrollViewSectionsBooksResults:{
    backgroundColor: "white"
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",
    // height: 250
  }
});

export default SearchTab