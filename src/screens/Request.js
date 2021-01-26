import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedRequest, updateRequest } from "../store/actions";

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

const Request = () => {
  const dispatch = useDispatch();
  const receivedRequest = useSelector((state) => state.receivedRequestPlayer);
  React.useEffect(() => {
    dispatch(getReceivedRequest());
  }, []);

  return (
    <Container>
      <Content>
        <Text>List Request</Text>
        <Card>
          {receivedRequest.map((item) => {
            return (
              <CardItem key={item._id} style={{ margin: 10 }}>
                <Left>
                  <Thumbnail
                    // square
                    large
                    source={require("../assets/images/matchesNearMe.png")}
                  />
                  <Body>
                    <Text>{item.origin.username}</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    onPress={() =>
                      dispatch(updateRequest(item._id, "accepted"))
                    }
                    transparent
                    style={{ flexDirection: "row" }}
                  >
                    <Text>Accept</Text>
                    <Icon active name="check-square" type="FontAwesome" />
                  </Button>
                  <Button
                    onPress={() =>
                      dispatch(updateRequest(item._id, "Rejected"))
                    }
                    transparent
                  >
                    <Text>Deny</Text>
                    <Icon active name="window-close" type="FontAwesome" />
                  </Button>
                </Right>
              </CardItem>
            );
          })}
        </Card>
      </Content>
    </Container>
  );
};

export default Request;
