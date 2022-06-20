import { View, Text } from 'react-native'
import React from 'react'

const ViewCategory = ({route, navigation}) => {
  return (
    <View>
      <Text>ViewCategory: {route.params.catname}</Text>
    </View>
  )
}

export default ViewCategory