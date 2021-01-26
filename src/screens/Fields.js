import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCourt } from "../store/actions/court";
import { getUserLogin } from "../utility/userLogin";
import { getAccessToken } from "../utility/token";
import { getDistance } from "geolib";

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

const Fields = ({ navigation }) => {
  const courts = useSelector((state) => state.courts);
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    getUserLogin()
      .then((res1) => {
        setUserLogin(res1);
        return getAccessToken();
      })
      .then((res2) => {
        dispatch(getCourt(res2));
      });
  }, [dispatch, setUserLogin]);

  const listCourts = courts.map((court) => {
    court.distance = getDistance(
      { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
      { latitude: court.position.lat, longitude: court.position.lng }
    );
    return court;
  });
  console.log(listCourts);
  const move = (page, id) => {
    navigation.navigate(page, id);
  };

  return (
    <Container>
      <Content>
        {listCourts.map((court) => {
          return (
            <Card key={court._id}>
              <CardItem style={{ margin: 10 }}>
                <Left>
                  <Thumbnail
                    square
                    large
                    source={require("../assets/images/fieldsDummy.jpg")}
                  />
                  <Body>
                    <Text>{court.name}</Text>
                    <Text>{court.distance / 1000} KM</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() =>
                      move("DetailField", {
                        screens: "MainApp",
                        params: { court },
                      })
                    }
                  >
                    <Text>View Detail</Text>
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

export default Fields;
