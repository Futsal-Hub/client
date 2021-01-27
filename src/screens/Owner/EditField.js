import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { getCourtId, editCourt } from "../../store/actions/court";
import { getAccessToken } from "../../utility/token";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const EditField = ({ route, navigation }) => {
  const { id } = route.params.params;
  const dispatch = useDispatch();
  const court = useSelector((state) => state.court);
  const owner = useSelector(state => state.user)

  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [tipe, setTipe] = useState(null);
  const [schedule1, setSchedule1] = useState(null);
  const [schedule2, setSchedule2] = useState(null);
  const [address, setAddress] = useState(null);
  const [isValid, setIsValid] = useState(true)

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
    Alert.alert(
      "Notification",
      "Are you sure want to edit the court data?",
      [
        {
          text: "Ok",
          onPress: () => goUpdate()
        },
        {
          text: "Cancel",
          onPress: () => navigation.navigate("OwnerApp")
        }
      ]
    )
  };

  const goUpdate = () => {
    if (!name || !price || !tipe || !schedule1 || !schedule2 || !image || !address) {
      setIsValid(false)
      setTimeout(() => {
        setIsValid(true)
      }, 2500);
    } else {
      const payload = {
        name,
        price,
        type: tipe,
        position: {
          lat: owner.position.lat,
          lng: owner.position.lng,
        },
        schedule: {
          open: schedule1,
          close: schedule2,
        },
        address,
        owner,
        photos: image,
      };
      getAccessToken()
        .then((res) => {
          dispatch(editCourt(res, id, payload, owner._id))
          navigation.navigate("OwnerApp")
        })
        .catch((err) => console.log(err));
    }
  }

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
        <Text style={{color: 'white', fontSize: 20, marginLeft: "auto" }}>Edit Field</Text>
          <TouchableOpacity style={{marginLeft: "auto" }} onPress={() => logout()}>
            <Feather
              name="log-out"
              size={25}
              color="white"
            />
          </TouchableOpacity>
      </Header>
        {
          !isValid ? <Text style={{color: 'red'}}>Please Fill All Field !</Text>: <Text></Text>
        }
        <Form>
          <Item style={{marginRight: 20}}>
            <Input
              required
              placeholder="name"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </Item>
          <Item style={{marginRight: 20}}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 250, height: 150 }}
              />
            )}
            <Button style={{marginLeft: "auto", marginTop: "auto"}} onPress={pickImage}>
              <Text>IMG</Text>
            </Button>
          </Item>
          <Item style={{marginRight: 20}}>
          </Item>
          <Item style={{marginRight: 20}}>
            <Input
              required
              placeholder="price"
              keyboardType={"number-pad"}
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </Item>
          <Item style={styles.item} picker style={{marginLeft: 20, marginRight: 20}}>
            <Picker
              mode="dropdown"
              placeholder="Type"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={tipe}
              onValueChange={(value) => setTipe(value)}
              value={tipe}
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
          <Item style={{marginRight: 20}}>
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
          <Item style={{marginRight: 20}}>
            <Input
              required
              placeholder="address"
              onChangeText={(value) => setAddress(value)}
              value={address}
            />
          </Item>
          <View style={{marginBottom: 20, flex: 1, flexDirection: "row"}}>
            <Button
              bordered
              dark
              style={styles.button}
              onPress={() => onSubmit()}
            >
              <Text>Edit Field</Text>
            </Button>
            <Button 
              bordered
              dark
              style={styles.button}
              onPress={() => navigation.goBack()}
            > 
              <Text>Cancel</Text>
            </Button>
          </View>
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
  },
  itemBtn: {
    borderBottomWidth: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 30,
    backgroundColor: "#ff9900",
  },
};

export default EditField;
