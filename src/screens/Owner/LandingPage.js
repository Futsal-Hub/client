import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourt } from "../../store/actions/court";
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
import { removeToken } from '../../utility/token'
import { removeUserLogin } from '../utility/userLogin'


const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const courts = useSelector((state) => state.courts);
  console.log(courts);

  useEffect(() => {
    dispatch(getCourt());
  }, [dispatch]);

  const logout = () => {
    removeToken()
    removeUserLogin()

    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  const move = (page, id) => {
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
                  <Button transparent>
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
