import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { deleteCourt, getCourt } from "../../store/actions/court";
import { getAccessToken } from "../../utility/token";
import { removeToken } from "../../utility/token";

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const courts = useSelector((state) => state.courts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourt(res));
      })
      .catch((err) => console.log(err));
  }, [dispatch, courts]);

  const delOnPress = (id) => {
    getAccessToken()
      .then((res) => {
        dispatch(deleteCourt(id, res));
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  const move = (page, id) => {
    console.log("masuk");
    navigation.navigate(page, id);
  };

  return (
    <Container>
      <Content>
        <Text>List Field</Text>
        <Button onPress={() => logout()}>
          <Text>Logout</Text>
        </Button>
        {courts.map((item) => {
          return (
            <Card key={item._id}>
              <CardItem style={{ margin: 10 }}>
                <Left>
                  {/* <Thumbnail
                    // square
                    large
                    source={item.photos}
                  /> */}
                  {/* <Text>{item.photos}</Text> */}
                  <Body>
                    <Text>{item.name}</Text>
                    <Text>{item.type}</Text>
                    <Text>{item.address}</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    transparent
                    style={{ flexDirection: "row" }}
                    onPress={() => move("EditField", { id: item._id })}
                  >
                    <Text>Edit</Text>
                    <Icon active name="check-square" type="FontAwesome" />
                  </Button>
                  <Button transparent onPress={() => delOnPress(item._id)}>
                    <Text>Delete</Text>
                    <Icon active name="window-close" type="FontAwesome" />
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

const styles = {
  ModalInsideView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    height: 245,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
};

export default LandingPage;
