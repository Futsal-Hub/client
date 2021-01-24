import React from 'react'
import { View, Text, Modal } from 'react-native'
import { Button } from 'native-base'

const LandingPage = () => {
  const [modalVisibility, setModalVisibility] = useState(false)

  const showModal = () => {
    setModalVisibility(true)
  }

  return (
    <View>
      <Text>Ini Add Field</Text>
      <Button onPress={() => setModalVisibility(true)}><Text>Show Modal</Text></Button>
      <Modal
        transparent={true}
        animationType={"slide"}
        visible={modalVisibility}
        onRequestClose={() => { showModal(!modalVisibility) }} >
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.ModalInsideView}>
          <Button onPress={() => {
                setModalVisibility(!modalVisibility);
              }}><Text>X</Text></Button>
          <Text style={{color:'white',fontSize:14,fontWeight:'700'}}>Hello </Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = {        
  ModalInsideView:{
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor : "#00BCD4", 
    height: 245 ,
    width: '90%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
   
  }
}

export default LandingPage
