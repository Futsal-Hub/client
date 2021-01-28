import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../store/actions/user";
import { getDistance } from "geolib";
import { invitePlayer } from "../store/actions";
import { getAccessToken } from "../utility/token";
import { getBookingByPlayer } from "../store/actions/booking";
import {
  View,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import { Alert } from "react-native";
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
  Header,
} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import { removeToken } from "../utility/token";


const SPACING = 20;
const AVATAR_SIZE = 70;

const Players = ({ navigation }) => {
  const users = useSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const myBookingsRaw = useSelector((state) => state.myBooking);
  const [target, setTarget] = useState({});
  let myBookings = [...myBookingsRaw];
  myBookings = myBookings.filter((item) => item.status === "accepted");

  useEffect(() => {
    getAccessToken().then((res) => {
      dispatch(fetchUser(res));
      dispatch(getBookingByPlayer(userLogin._id, res));
    });
  }, [dispatch]);

  const openModal = (player) => {
    setTarget(player);
    setModalVisible(true);
  };

  const players = users.map((player) => {
    if (player.role === "player") {
      player.distance = getDistance(
        { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
        { latitude: player.position.lat, longitude: player.position.lng }
      );
      return player;
    }
  });
  players.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  let listPlayers = [];
  players.forEach((player) => {
    if (player) {
      listPlayers.push(player);
    }
  });

  // listPlayers = listPlayers.slice(1);
  // console.log(listPlayers, "setelah slice");
  listPlayers = listPlayers.filter((player) => player._id != userLogin._id);

  console.log(listPlayers, "<<<< setelah filter");

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
      <Header
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "#EF7911",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, marginLeft: "auto" }}>
          Nearby Players
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
      <Content style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={listPlayers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: "whitesmoke",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                }}
              >
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/${Math.floor(
                      Math.random() * (1000 - 50 + 1) + 50
                    )}`,
                  }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 22, fontWeight: "700", color: '#555555' }}>
                    {item.username}
                  </Text>
                  <Text
                    style={{ fontSize: 18, opacity: 0.8, color: "#0099cc" }}
                  >
                    {item.email}
                  </Text>
                  <Text style={{ fontSize: 14, opacity: 0.7 }}>
                    {item.distance / 1000} KM
                  </Text>
                </View>
                <AntDesign name="adduser" size={30} color="#EF7911" onPress={() => openModal(item)} style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto'}}/>
              </View>
            );
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose your available game</Text>
            <Content>
              {myBookings.map((booking) => {
                return (
                  <Card style={styles.modalView} key={booking._id}>
                    <CardItem style={{width: 250}}>
                      <View style={{marginRight: 'auto'}}>
                        <Text style={{fontSize: 20, color: 'grey', fontWeight: 'bold'}}>{booking.court.name}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <AntDesign name="user" size={15} color="black" />
                          <Text style={{color: 'darkgrey', marginLeft: 5, fontSize: 14, marginBottom: 5}}>{booking.host.username}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <AntDesign name="calendar" size={15} color="black" />
                          <Text style={{color: 'darkgrey', fontSize: 12, marginLeft: 5}}>{booking.date.date}</Text>
                        </View>
                      </View>
                      <View style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto'}}>
                        <AntDesign name="adduser" size={30} color="#EF7911" onPress={() => {
                          dispatch(invitePlayer(target, booking))
                          Alert.alert(
                            "Notification",
                            "Successfully Send Invite!",
                            [
                              {
                                text: "Ok",
                                onPress: () => setModalVisible(false)
                              }
                            ]
                          )
                        }} />
                      </View>
                    </CardItem>
                  </Card>
                );
              })}
            </Content>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3", marginTop: 20 }} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  modalView: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    alignSelf: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText:{
    textAlign: "center",
  },
});

export default Players;
