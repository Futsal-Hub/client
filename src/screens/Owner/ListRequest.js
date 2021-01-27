import React, { useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, View, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { getBookingByOwner, updateBookingFromOwner } from '../../store/actions/booking'
import { getAccessToken, removeToken } from "../../utility/token";
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
        <Card style={{marginLeft: 10, marginRight: 10, marginTop: 10}}>
          {
            listBooking.map(booking => {
              console.log(booking)
              return (
                <CardItem bordered key={booking._id} style={{ marginTop: 10, flex: 1, flexDirection: 'row'}}>
                    <Image
                      source={{uri: booking.court.photos}}
                      style={{width: 150, height: 120, }}
                    />
                    <Body style={{marginLeft: 30}}>
                      <Text style={{fontSize: 20, color: '#EF7911'}}>{booking.court.name}</Text>
                      <View style={{flex:1, flexDirection: 'row', marginTop: 5}}>
                        <AntDesign name="user" size={20} color="black" />
                        <Text style={{fontSize: 12, marginLeft: 10}}>{booking.host.username}</Text>
                      </View>
                      <View style={{flex:1, flexDirection: 'row', marginTop: 5}}>
                        <AntDesign name="calendar" size={20} color="black" />
                        <Text style={{fontSize: 12, marginLeft: 10}}>{booking.date.date}</Text>
                      </View>
                      <View style={{flex:1, flexDirection: 'row', marginTop: 5}}>
                        <AntDesign name="clockcircleo" size={20} color="black" />
                        <Text style={{fontSize: 12, marginLeft: 10}}>{booking.date.duration} Hour</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                        <AntDesign name="checkcircle" size={30} color="blue" onPress={() => decisionHandler(booking, 'accepted')} />
                        <AntDesign style={{marginLeft: 50}} name="closecircle" size={30} color="red" onPress={() => decisionHandler(booking, 'rejected')}/>
                      </View>
                    </Body>
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
