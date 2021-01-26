import React, { useState } from "react";
import { setAccessToken } from "../utility/token";
import * as Location from "expo-location";
import axios from "../config/axiosInstances";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Picker,
  Left,
} from "native-base";
import { useDispatch } from "react-redux";
import { Image, Dimensions, KeyboardAvoidingView } from "react-native";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState("");
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const move = (page) => {
    navigation.navigate(page);
    setUsername("");
    setPassword("");
  };

  const validate = async () => {
    if (!username || !password) {
      setValid("Please Fill All Form !");
      setTimeout(() => {
        setValid("");
      }, 3000);
    } else {
      let { status } = await Location.requestPermissionsAsync();
      if (!status) {
        throw `location is unavailable`
      }
      else if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const payload = {
        email: username,
        password,
        position: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      };
      axios({
        method: "POST",
        url: "/login",
        data: payload,
      })
        .then((result) => {
          const role = result.data.user.role;
          setAccessToken(JSON.stringify(result.data.access_token));
          dispatch({
            type: "set-user",
            payload: result.data.user,
          });
          role === "owner"
            ? move("OwnerApp")
            : role === "player"
            ? move("MainApp")
            : console.log(role);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Header style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </Header>
      {isValid ? (
        <Text style={{ color: "red", marginLeft: "auto", marginRight: "auto" }}>
          {isValid}
        </Text>
      ) : (
        <Text></Text>
      )}
      <Content>
        <Form style={styles.form}>
          <Item style={styles.item}>
            <Input
              placeholder="Email"
              value={username}
              onChangeText={(value) => setUsername(value)}
            />
          </Item>
          <Item style={styles.item}>
            <Input
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </Item>
          <Item style={styles.itemBtn}>
            <Button
              bordered
              dark
              style={styles.button}
              onPress={() => validate()}
            >
              <Text>Sign In</Text>
            </Button>
            <Button
              bordered
              dark
              style={styles.button}
              onPress={() => move("SignUp")}
            >
              <Text>Sign Up</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

const { width } = Dimensions.get("window");

const styles = {
  header: {
    height: 200,
    backgroundColor: "white",
    borderBottomWidth: 0,
    elevation: 0,
  },
  flex: {
    width: 300,
    flex: 1,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    marginTop: 5,
    marginLeft: 10,
  },
  itemBtn: {
    borderBottomWidth: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: "#ff9900",
  },
  logo: {
    alignItems: "center",
    width: width - 50,
    height: 200,
    top: 10,
    left: 5,
  },
};
export default LoginPage;
