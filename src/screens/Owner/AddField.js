import React, { useState, useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { socket } from '../../config/socket';

const AddField = () => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisibility, setModalVisibility] = useState(false)

  const cam = useRef().current

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

  //buat camera
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={pickImage}><Text>Pick an image from camera roll</Text></Button>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text>Ini Add Field</Text>
      <Camera ref={cam} style={{ flex: 1}} type={type}>
        <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row"}}>
          <View style={{flexDirection: 'row'}}>
            
          </View>
          <Button
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        <Text>Flip</Text></Button>
        </View>
      </Camera>
    </View>
  )

}


export default AddField
