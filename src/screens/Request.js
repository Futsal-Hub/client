import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedRequest, updateRequest } from "../store/actions";
import { TouchableOpacity, View } from "react-native";
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
  Header,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { removeToken } from "../utility/token";
import { socket } from "../config/socket";

const Request = ({navigation}) => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.receivedRequestPlayer);
  let receivedRequest = [...requests];
  receivedRequest = receivedRequest.filter((req) => req.status === "pending");
  React.useEffect(() => {
    dispatch(getReceivedRequest());
  }, []);
  socket.on("fetch request", () => {
    dispatch(getReceivedRequest());
  });

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
          Request Join
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
      <Content>
        <View style={{marginLeft: 10, marginRight: 10}}>
          {receivedRequest.map((item) => {
            return (
              <CardItem bordered key={item._id} style={{ margin: 10 }}>
                <Left>
                  <Thumbnail
                    // square
                    large
                    source={{
                      uri: `https://i.pravatar.cc/${Math.floor(
                        Math.random() * (1000 - 50 + 1) + 50
                      )}`,
                    }}
                  />
                  <Body>
                    <Text>{item.origin.username}</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    onPress={() =>
                      dispatch(
                        updateRequest(item._id, "accepted", item.game._id)
                      )
                    }
                    transparent
                    style={{ flexDirection: "row" }}
                  >
                    <Text>Accept</Text>
                    <Icon active name="check-square" type="FontAwesome" />
                  </Button>
                  <Button
                    onPress={() =>
                      dispatch(
                        updateRequest(item._id, "Rejected", item.game._id)
                      )
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
        </View>
      </Content>
    </Container>
  );
};

export default Request;
