import React from "react";
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

const DetailField = ({route, navigation}) => {
  const { court } = route.params;


  const move = (page) => {
    navigation.navigate(page);
  };

  return (
    <Container>
      <Content>
        {/* <Image source={court.photos} /> */}
        <Text>Name: {court.name}</Text>
        <Text>Harga: Rp {court.price}</Text>
        <Text>Type: {court.type}</Text>
        <Text>Open: {court.schedule.open}</Text>
        <Text>Close: {court.schedule.close}</Text>
        <Text>Address: {court.address}</Text>
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
