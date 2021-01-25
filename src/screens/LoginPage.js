import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setAccessToken } from "../utility/token";
import { setUserLogin } from "../utility/userLogin";
import * as Location from 'expo-location';

import axios from "axios";

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
import { Image, Dimensions } from "react-native";
import { login } from "../store/actions";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState("");
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const move = (page) => {
    navigation.navigate(page);
    setUsername("");
    setPassword("");
  };

  const validate = () => {
    if (!username || !password) {
      setValid("Please Fill All Form !");
      setTimeout(() => {
        setValid("");
      }, 3000);
    } else {
      const payload = {
        email: username,
        password,
        position: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      };
      axios({
        method: "POST",
        url: "http://10.0.2.2:3000/login",
        data: payload,
      })
        .then(result => {
          const role = result.data.user.role
          role === "owner" ? move("OwnerApp") : role === "player" ? move("MainApp") : console.log(role)
          setAccessToken(JSON.stringify(result.data.access_token))
          setUserLogin(JSON.stringify(result.data.user));
          dispatch({
            type: "set-user",
            payload: result.data.user
          })
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Header style={styles.header}>
        <Image
          source={require("../assets/images/logo.jpg")}
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
      <Form style={styles.form}>
        <Item style={styles.item}>
          <Input
            placeholder="Username"
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
    </Container>
  );
};

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
    height: height - 450,
    width: width,
    top: 10,
    left: 20,
  },
};
export default LoginPage;
