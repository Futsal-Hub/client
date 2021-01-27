import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
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
import { getAccessToken } from "../../utility/token";
import { addCourt } from "../../store/actions/court"
import { Feather, AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";


const AddField = ({ navigation }) => {
  const owner = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [tipe, setTipe] = useState("");
  const [schedule1, setSchedule1] = useState(null);
  const [schedule2, setSchedule2] = useState(null);
  const [address, setAddress] = useState(null);

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
  }, []);

  const onSubmit = () => {
    const tanggal = {
      open: schedule1,
      close: schedule2,
    };

    const position = {
      lat: owner.position.lat,
      lng: owner.position.lng,
    };

    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", tipe);
    formData.append("position", JSON.stringify(position));
    formData.append("schedule", JSON.stringify(tanggal));
    formData.append("address", address);
    formData.append("owner", JSON.stringify(owner));
    formData.append("photos", {
      uri: image,
      name: image.split("/").pop(),
      type: "image/jpg",
    });

    getAccessToken()
      .then((res) => {
        dispatch(addCourt(res, formData, owner._id))
        setImage(null);
        setName("");
        setPrice(0);
        setTipe("");
        setSchedule1(null);
        setSchedule2(null);
        setAddress("");
        navigation.goBack();
    })
    .catch(err => {
      console.log(err)
    });
  };

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

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  return (
    <Container>
      <Content>
        <Header style={{ flexDirection: "row", padding: 15, backgroundColor: '#EF7911'}}>
          <Text style={{color: 'white', fontSize: 20, marginLeft: "auto" }}>Add Field</Text>
            <TouchableOpacity style={{marginLeft: "auto" }} onPress={() => logout()}>
              <Feather
                name="log-out"
                size={25}
                color="white"
              />
            </TouchableOpacity>
        </Header>
        <Text>Ini Add Field</Text>
        <Form>
          <Item>
            <Input
              required
              placeholder="name"
              value={name}
              onChangeText={(value) => setName(value)}
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
              value={price}
              keyboardType={"number-pad"}
              onChangeText={(value) => setPrice(value)}
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
              value={schedule1}
              onChangeText={(value) => setSchedule1(value)}
              keyboardType={"number-pad"}
            />
            <Input
              required
              value={schedule2}
              placeholder="Close Hour"
              onChangeText={(value) => setSchedule2(value)}
              keyboardType={"number-pad"}
            />
          </Item>
          <Item>
            <Input
              required
              value={address}
              placeholder="address"
              onChangeText={(value) => setAddress(value)}
            />
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

export default AddField;
