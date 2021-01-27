import React, { useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { getBookingByOwner, updateBookingFromOwner } from '../../store/actions/booking'
import { getAccessToken } from "../../utility/token";
import { Feather, AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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

const ListRequest = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.bookings) 
  const dispatch = useDispatch()

  useEffect(() => {
    getAccessToken()
      .then(res => {
        dispatch(getBookingByOwner(res, user._id))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const decisionHandler = (booking, decision) => {
    const payload = {
      schedule: booking.schedule,
      host: booking.host,
      players: booking.players,
      court: booking.court,
      date: booking.date,
      status: decision,
    };

    getAccessToken()
      .then(res => {
        dispatch(updateBookingFromOwner(booking._id, res, payload, booking.court.owner._id))
      })
      .catch(err => console.log(err))
  }

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  let listBooking = []
  listBooking = bookings.filter((booking) => booking.status === 'pending')

  return (
    <Container>
      <Content>
        <Header style={{ flexDirection: "row", padding: 15, backgroundColor: '#EF7911'}}>
          <Text style={{color: 'white', fontSize: 20, marginLeft: "auto" }}>List Request</Text>
            <TouchableOpacity style={{marginLeft: "auto" }} onPress={() => logout()}>
              <Feather
                name="log-out"
                size={25}
                color="white"
              />
            </TouchableOpacity>
        </Header>
        <Card>
          {
            listBooking.map(booking => {
              return (
                <CardItem key={booking._id} style={{ margin: 10 }}>
                  <Left>
                    <Thumbnail
                      square
                      large
                      source={{uri: booking.court.photos}}
                    />
                    <Body>
                      <Text>{booking.court.name}</Text>
                      <Text>{booking.court.address}</Text>
                      <Text>{booking.court.distance}</Text>
                      {/* <Text>{booking.owner.username}</Text> */}
                      <Text>{booking.court.price}</Text>
                      <Text>{booking.court.type}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button transparent onPress={() => decisionHandler(booking, 'accepted')}>
                      <Text>Accept</Text>
                      <Icon active name="check-square" type="FontAwesome" />
                    </Button>
                    <Button transparent onPress={() => decisionHandler(booking, 'rejected')}>
                      <Text>Deny</Text>
                      <Icon active name="window-close" type="FontAwesome" />
                    </Button>
                  </Right>
                </CardItem>
              )
            })
          }
        </Card>
      </Content>
    </Container>
  )
}

export default ListRequest
