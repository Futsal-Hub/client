import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Image } from 'react-native'
import { Button, Container, Content, Header, Form, Item, Input, Text, Picker } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios'

const AddField = () => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisibility, setModalVisibility] = useState(false)

  const [name, setName] = useState("")
  const [price, setPrice] = useState(null)
  const [tipe, setTipe] = useState("")
  const [schedule1, setSchedule1] = useState(null)
  const [schedule2, setSchedule2] = useState(null)
  const [address, setAddress] = useState(null)

  const cam = useRef().current

  useEffect(() => {
    //buat ngambil file
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    //buat camera
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  
  const onSubmit = () => {
    const uploadUri = image
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1)
    const formData = new FormData();
    formData.append('image', filename);
    console.log(filename, '<<<<<<<<<')
    console.log(formData, '<<<')
    // axios({
    //   url: "https://api.imgur.com/3/image",
    //   method: "POST",
    //   headers: {
    //     Authorization: "Client-ID c445621e307ea2b"
    //   },
    //   data: formData
    // })
    fetch("https://api.imgur.com/3/image", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Client-ID c445621e307ea2b"
      },
      body: formData
    })
      .then(data => data.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    const payload = {
      name,
      price,
      type: tipe,
      // position,
      schedule: {
        open: schedule1,
        close: schedule2
      },
      address,
      // owner
    }
  }

  //buat camera
  const takePicture = async() => {
    if (cam.current) {
      const option = { quality: 1, base64: true, skipProcessing: false }
      let photo = await cam.current.takePictureAsync(options)

      console.log(cam.current.getSupportedRatiosAsync())
      const source = photo.uri

      if (source) {
        cam.current.resumePreview()
        console.log("picture source", source)
      }
    }
    
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // sampe sini

  //buat ngambil file
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image)
    }
  }
  // ampe sini

  const showModal = () => {
    setModalVisibility(true)
  }

  return (
    <Container>
      <Content>
      <Header style={{backgroundColor: "whitesmoke"}}>
        <Text>Ini Pala</Text>
      </Header>
      
      <Text>Ini Add Field</Text>
      <Form>
        <Item>
          <Input required placeholder="name" onChangeText={value => setName(value)}/>
        </Item>
        <Item>
          <Button onPress={pickImage}><Text>Pick an image from camera roll</Text></Button>
        </Item>
        <Item>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Item>
        <Item>
          <Input required placeholder="price" keyboardType={"number-pad"} onChangeText={value => setPrice(value)}/>
        </Item>
        <Item style={styles.item} picker>
          <Picker
            mode="dropdown"
            placeholder="Type"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={tipe}
            onValueChange={(value) => setTipe(value)}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Vinyl" value="Vinyl" />
            <Picker.Item label="Parquette" value="Parquette" />
            <Picker.Item label="Taraflex" value="Taraflex" />
            <Picker.Item label="Polyethyle" value="Polyethyle" />
            <Picker.Item label="Synthetic" value="Synthetic" />
            <Picker.Item label="Cement" value="Cement" />
          </Picker>
        </Item>
        <Item>
          <Input required placeholder="Open Hour" onChangeText={value => setSchedule1(value)} keyboardType={"number-pad"}/>
          <Input required placeholder="Close Hour" onChangeText={value => setSchedule2(value)} keyboardType={"number-pad"}/>
        </Item>
        <Item>
          <Input required placeholder="address" onChangeText={value => setAddress(value)}/>
        </Item>
        <Button
            bordered
            dark
            style={styles.button}
            onPress={() => onSubmit()}
          >
            <Text>Add Field</Text>
          </Button>
      </Form>
      {/* <Camera ref={cam} style={{ flex: 1}} type={type}>
        <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row"}}>
          <View style={{flexDirection: 'row'}}>
            <Button style={{flex: 0.1, alignSelf: "flex-end", alignItems: "center"}}
              onPress={() => takePicture}>  
            <Text>Flip</Text></Button>
          </View>
        </View>
      </Camera> */}
      </Content>
    </Container>
  )
}

const styles = {
  header: {
    height: 200,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    elevation: 0
  },
  flex: {
    width: 300,
    flex: 1
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20
  },
  item: {
    marginTop: 5,
    marginLeft: 10,
  },
  itemBtn: {
    borderBottomWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: '#ff9900'
  }
}

export default AddField
