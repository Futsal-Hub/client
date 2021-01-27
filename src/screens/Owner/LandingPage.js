import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Body,
  CardItem,
  Container,
  Content,
  Right,
  Text,
  Thumbnail,
  Card,
  Left,
  Button,
  Icon,
  Header
} from "native-base";
import { deleteCourt, getCourtByOwner } from "../../store/actions/court";
import { getAccessToken } from "../../utility/token";
import { removeToken } from "../../utility/token";
import { Feather, AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const courts = useSelector((state) => state.courts);
  const user = useSelector((state) => state.user);
 
  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourtByOwner(res, user._id));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const delOnPress = (id) => {
    getAccessToken()
      .then((res) => {
        dispatch(deleteCourt(id, res));
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  const move = (page, id) => {
    console.log("masuk");
    navigation.navigate(page, id);
  };

  return (
    <Container>
      <Content>
      <Header style={{ flexDirection: "row", padding: 15}}>
          <Text style={{color: 'white', fontSize: 20}}>Home</Text>
          <TouchableOpacity style={{marginLeft: 250 }} onPress={() => logout()}>
          <Feather
                  name="log-out"
                  size={25}
                  color="white"
                />
          </TouchableOpacity>
        </Header>
        {courts.map((item) => {
          return (
            <Card key={item._id} style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>
              <CardItem header bordered style={styles.noPadding}>
                <Image 
                  source={{uri: item.photos}}
                  style={{flex: 1, height: 150}}
                />
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>{item.name}</Text>
                <AntDesign style={{marginLeft: 'auto'}} name="edit" size={24} color="black" onPress={() =>
                    move("EditField", {
                      screens: "OwnerApp",
                      params: { id: item._id },
                    })
                  } />
                <AntDesign style={{marginLeft: 30}} onPress={() => delOnPress(item._id)} name="delete" size={24} color="black" />
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                  <Entypo name="address" size={24} color="black" />
                  <Text style={{marginLeft: 10}}>{item.address}</Text>
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                  <MaterialIcons name="monetization-on" size={24} color="black" />
                  <Text style={{marginLeft: 10}}>{item.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  })}</Text>
              </CardItem>
              <CardItem>
                <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
                  <Text style={{marginLeft: 10}}>{item.type}</Text>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
};

const styles = {
  ModalInsideView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    height: 245,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  noPadding: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
};

export default LandingPage;