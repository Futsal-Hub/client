import React from "react";
import { View } from "react-native";
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
} from "native-base";

const Fields = () => {
  return (
    <Container>
      <Content>
        <Card>
          <CardItem style={{margin: 10}}>
            <Left>
              <Thumbnail square large source={require("../assets/images/fieldsDummy.jpg")} />
              <Body>
                <Text>Title Field</Text>
                <Text>Informasi tambahan e.g harga, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" /> */}
                <Text>Booking</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem style={{margin: 10}}>
            <Left>
              <Thumbnail square large source={require("../assets/images/fieldsDummy.jpg")} />
              <Body>
                <Text>Title Field</Text>
                <Text>Informasi tambahan e.g harga, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" /> */}
                <Text>Booking</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Fields;
