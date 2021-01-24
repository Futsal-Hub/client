import React from 'react'
import { View } from 'react-native'
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
const ListRequest = () => {
  return (
    <Container>
      <Content>
        <Text>List Request</Text>
        <Card>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                square
                large
                source={require("../../assets/images/requestBook.jpg")}
              />
              <Body>
                <Text>Info Langan</Text>
                <Text>e.g jumlah, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                <Text>Accept</Text>
                <Icon active name="check-square" type="FontAwesome" />
              </Button>
               <Button transparent>
                <Text>Deny</Text>
                <Icon active name="window-close" type="FontAwesome" />
              </Button>
            </Right>
          </CardItem>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                square
                large
                source={require("../../assets/images/requestBook.jpg")}
              />
              <Body>
                <Text>Title Field</Text>
                <Text>e.g harga, location dll</Text>
              </Body>
            </Left>
            <Right >
              <Button transparent style={{flexDirection: "row"}}>
                <Text>Accept</Text>
                <Icon active name="check-square" type="FontAwesome" />
              </Button>
               <Button transparent>
                <Text>Deny</Text>
                <Icon active name="window-close" type="FontAwesome" />
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

export default ListRequest
