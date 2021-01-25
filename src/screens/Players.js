import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, fetchPlayer } from "../store/actions/user";
import { View } from "react-native";
import { getUserLogin } from "../utility/userLogin";
import { getDistance, getPreciseDistance } from "geolib";
import { invitePlayer } from "../store/actions";
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
  const users = useSelector((state) => state.users);
  // const players = useSelector(state => state.players)
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    dispatch(fetchUser());
    getUserLogin().then((res) => {
      setUserLogin(res);
    });
  }, []);

  const players = users.map((player) => {
    if (player.role === "player") {
      player.distance = getDistance(
        { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
        { latitude: player.position.lat, longitude: player.position.lng }
      );
      return player;
    }
  });
  players.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  let listPlayers = [];
  players.forEach((player) => {
    if (player) {
      listPlayers.push(player);
    }
  });
  listPlayers = listPlayers.slice(1);

  return (
    <Container>
      <Content>
        <Text>Player Near Me</Text>
        {listPlayers.map((player) => {
          return (
            <Card key={player._id}>
              <CardItem style={{ margin: 10 }}>
                <Left>
                  <Thumbnail
                    // square
                    // large
                    source={require("../assets/images/players.png")}
                  />
                  <Body>
                    <Text>{player.username}</Text>
                    <Text>{player.distance / 1000} KM</Text>
                  </Body>
                </Left>
                <Right>
                  <Button onPress={() => console.log("clicked")} transparent>
                    {/* <Icon active name="sign-in-alt" /> */}
                    <Text>Invite</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
};

export default Players;
