import React, { useState, useEffect, useRef } from "react";
import { View, KeyboardAvoidingView, Image } from "react-native";
import {
  Button,
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Text,
  Picker,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { getCourtId } from "../../store/actions/court";
import { getAccessToken } from "../../utility/token";
import axios from "axios";

const EditField = ({ route, navigation }) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const court = useSelector((state) => state.court);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisibility, setModalVisibility] = useState(false);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [tipe, setTipe] = useState(null);
  const [schedule1, setSchedule1] = useState(null);
  const [schedule2, setSchedule2] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourtId(id, res));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (court) {
      setImage(court.photos);
      setName(court.name);
      setPrice(court.price);
      setTipe(court.type);
      setSchedule1(court.schedule.open);
      setSchedule2(court.schedule.close);
      setAddress(court.address);
    }
  }, [court]);

  const cam = useRef().current;

  useEffect(() => {
    //buat ngambil file
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    //buat camera
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onSubmit = () => {
    const payload = {
      name,
      price,
      type: tipe,
      position: {
        lon: 1233484848,
        lat: 21312323773,
      },
      schedule: {
        open: schedule1,
        close: schedule2,
      },
      address,
      owner: "Arif",
      photos: image,
    };
    getAccessToken().then((res) => {
      axios({
        url: "http://10.0.2.2:3000/court/" + id,
        method: "PUT",
        headers: {
          access_token: res,
        },
        data: payload,
      })
        .then((res) => {
          // console.log(res.data);
          navigation.navigate("OwnerApp");
        })
        .catch((err) => console.log(err));
    });
  };

  //buat camera
  const takePicture = async () => {
    if (cam.current) {
      const option = { quality: 1, base64: true, skipProcessing: false };
      let photo = await cam.current.takePictureAsync(options);

      console.log(cam.current.getSupportedRatiosAsync());
      const source = photo.uri;

      if (source) {
        cam.current.resumePreview();
        console.log("picture source", source);
      }
    }
  };

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
      console.log(image);
    }
  };
  // ampe sini

  const showModal = () => {
    setModalVisibility(true);
  };

  return (
    <Container>
      <Content>
        <Header style={{ backgroundColor: "whitesmoke" }}>
          <Text>Ini Pala</Text>
        </Header>

        <Text>Ini Edit Field</Text>
        <Form>
          <Item>
            <Input
              required
              placeholder="name"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </Item>
          <Item>
            <Button onPress={pickImage}>
              <Text>Pick an image from camera roll</Text>
            </Button>
          </Item>
          <Item>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </Item>
          <Item>
            <Input
              required
              placeholder="price"
              keyboardType={"number-pad"}
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </Item>
          <Item style={styles.item} picker>
            <Picker
              mode="dropdown"
              placeholder="Type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={tipe}
              onValueChange={(value) => setTipe(value)}
              value={type}
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
            <Input
              required
              placeholder="Open Hour"
              onChangeText={(value) => setSchedule1(value)}
              keyboardType={"number-pad"}
              value={schedule1}
            />
            <Input
              required
              placeholder="Close Hour"
              onChangeText={(value) => setSchedule2(value)}
              keyboardType={"number-pad"}
              value={schedule2}
            />
          </Item>
          <Item>
            <Input
              required
              placeholder="address"
              onChangeText={(value) => setAddress(value)}
              value={address}
            />
          </Item>
          <Button
            bordered
            dark
            style={styles.button}
            onPress={() => onSubmit()}
          >
            <Text>Edit Field</Text>
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
  );
};

const styles = {
  header: {
    height: 200,
    backgroundColor: "white",
    borderBottomWidth: 0,
    elevation: 0,
  },
  flex: {
    width: 300,
    flex: 1,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    marginTop: 5,
    marginLeft: 10,
  },
  itemBtn: {
    borderBottomWidth: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: "#ff9900",
  },
};

export default EditField;
