import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'

const AddField = () => {
  const [modalVisibility, setModalVisibility] = useState(false)

  const showModal = () => {
    setModalVisibility(true)
  }

  return (
    <View>
      <Text>Ini Add Field</Text>
    </View>
  )

}


export default AddField
