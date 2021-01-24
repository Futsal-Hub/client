import React from "react";
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

const Matches = () => {
  return (
    <Container>
      <Content>
        <Text>Matches Near Me</Text>
        <Card>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                // square
                large
                source={require("../assets/images/matchesNearMe.png")}
              />
              <Body>
                <Text>Info Langan</Text>
                <Text>e.g jumlah, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" type="FontAwesome" /> */}
                <Text>Join</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem style={{ margin: 10 }}>
            <Left>
              <Thumbnail
                // square
                large
                source={require("../assets/images/matchesNearMe.png")}
              />
              <Body>
                <Text>Title Field</Text>
                <Text>e.g harga, location dll</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                {/* <Icon active name="sign-in-alt" type="FontAwesome" /> */}
                <Text>Join</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Matches;
