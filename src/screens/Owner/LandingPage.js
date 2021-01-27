import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
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
    Alert.alert(
      "Notification",
      "Are you sure want to delete this court?",
      [
        {
          text: "Ok",
          onPress: () => {
            getAccessToken()
              .then((res) => {
                dispatch(deleteCourt(id, res, user._id));
              })
              .catch((err) => console.log(err));
          }
        },
        {
          text: "Cancel",
          onPress: () => navigation.navigate("OwnerApp")
        }
      ]
    )
    
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
        <Header style={{ flexDirection: "row", padding: 15, backgroundColor: '#EF7911'}}>
          <Text style={{color: 'white', fontSize: 20, marginLeft: "auto" }}>Home</Text>
            <TouchableOpacity style={{marginLeft: "auto" }} onPress={() => logout()}>
              <Feather
                name="log-out"
                size={25}
                color="white"
              />
            </TouchableOpacity>
        </Header>
        {courts.map((item) => {
          let price = "Rp. " + Number(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00"
          return (
            <Card key={item._id} style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>
              <CardItem header bordered style={styles.noPadding}>
                <Image 
                  source={{uri: item.photos}}
                  style={{flex: 1, height: 150}}
                />
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                <Text style={{fontSize: 25, color: '#474b4d'}}>{item.name}</Text>
                <AntDesign style={{marginLeft: 'auto'}} name="edit" size={24} color="#EF7911" onPress={() =>
                    move("EditField", {
                      screens: "OwnerApp",
                      params: { id: item._id },
                    })
                  } />
                <AntDesign style={{marginLeft: 30}} onPress={() => delOnPress(item._id)} name="delete" size={24} color="#EF7911" />
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                  <Entypo name="address" size={20} color="#EF7911" />
                  <Text style={{marginLeft: 10, color: '#474b4d', fontSize: 14}}>{item.address}</Text>
              </CardItem>
              <CardItem style={{paddingBottom: 0}}>
                <MaterialCommunityIcons name="soccer-field" size={20} color="#EF7911" />
                  <Text style={{marginLeft: 10, color: '#474b4d', fontSize: 14}}>{item.type}</Text>
              </CardItem>
              <CardItem>
                  <MaterialIcons name="monetization-on" size={20} color="#EF7911" />
                  <Text style={{marginLeft: 10, color: '#474b4d', color: "#EF7911"}}>{price}</Text><Text style={{color: '#474b4d', fontSize: 14}}> / Hour</Text>
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