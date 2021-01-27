import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../utility/token";
import { getDistance } from "geolib";
import { invitePlayer } from "../store/actions";
import { getBooking } from "../store/actions";
import { Alert } from "react-native";
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
  const bookings = useSelector((state) => state.allBookings);
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessToken().then((res1) => {
      dispatch(getBooking(res1));
    });
  }, []);

  const handleJoin = (player, booking) => {
    Alert.alert(
      "Confirmation",
      "Are you sure want to join this game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(invitePlayer(player, booking)) },
      ],
      { cancelable: false }
    );
  };

  const listMatches = bookings.map((match) => {
    match.court.distance = getDistance(
      { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
      {
        latitude: match.court.position.lat,
        longitude: match.court.position.lng,
      }
    );
    return match;
  });

  const activeMatches = listMatches.filter((activeMatch) => {
    return activeMatch.status === "accepted";
  });

  return (
    <Container>
      <Content>
        <Text>Matches Near Me</Text>
        {activeMatches.map((listMatch) => {
          return (
            <Card key={listMatch._id}>
              <CardItem style={{ margin: 10 }}>
                <Left>
                  <Thumbnail
                    // square
                    large
                    source={require("../assets/images/matchesNearMe.png")}
                  />
                  <Body>
                    <Text>{listMatch.court.name}</Text>
                    <Text>{listMatch.court.address}</Text>
                    <Text>{listMatch.court.distance / 1000} KM</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() => handleJoin(listMatch.host, listMatch)}
                  >
                    {/* <Icon active name="sign-in-alt" type="FontAwesome" /> */}
                    <Text>Join</Text>
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

export default Matches;
