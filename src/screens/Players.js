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

const Players = () => {
  return (
    <Container>
      <Content>
      <Text>Player Near Me</Text>
        <Card>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                // square
                // large
                source={require("../assets/images/players.png")}
              />
              <Body>
                <Text>Joko 1</Text>
                <Text>Informasi tambahan</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" /> */}
                <Text>Invite</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                // square
                // large
                source={require("../assets/images/players.png")}
              />
              <Body>
                <Text>Joko 2</Text>
                <Text>Informasi tambahan</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" /> */}
                <Text>Invite</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Players;
