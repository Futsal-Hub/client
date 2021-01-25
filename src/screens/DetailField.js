import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
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
  Right,
  Left,
  Row,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getCourtId } from "../store/actions/court";
import { getAccessToken } from "../utility/token";

const DetailField = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const court = useSelector((state) => state.court);

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourtId(id, res));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const move = (page) => {
    navigation.navigate(page);
  };

  return (
    <Container>
      <Content>
        <Text>{JSON.stringify(court)}</Text>
        <Text>=========================================</Text>
        {/* <Image source={court.photos} /> */}
        {/* <Text>Name: {court.name}</Text>
        <Text>Harga: Rp. {court.price}</Text>
        <Text>Type: {court.type}</Text>
        <Text>Open: {court.schedule.open}</Text>
        <Text>Close: {court.schedule.close}</Text>
        <Text>Address: {court.address}</Text> */}
        <View style={{ flex: 1, flexDirection: "row", padding: 20, left: 55 }}>
          <Button style={{ marginRight: 20 }}>
            <Text>Booking</Text>
          </Button>
          <Button onPress={() => move("MainApp")}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default DetailField;

const styles = StyleSheet.create({});
