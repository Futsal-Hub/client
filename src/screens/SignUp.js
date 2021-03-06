import React, { useState } from "react";
import { KeyboardAvoidingView, Image, Dimensions } from "react-native";
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
} from "native-base";
import { signUp } from "../store/actions";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isValid, setValid] = useState("");

  const move = (page) => {
    navigation.navigate(page);
  };

  const validate = () => {
    if (!username || !password || !email || !role) {
      setValid("Please Fill All Form !");
      setTimeout(() => {
        setValid("");
      }, 3000);
    } else {
      const payload = {
        username,
        password,
        email,
        role,
      };
      signUp(payload);
      move("LoginPage");
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
        <Text style={{ color: "red" }}>{isValid}</Text>
      ) : (
        <Text></Text>
      )}
      <Content>
        <Form style={styles.form}>
          <Item style={styles.item} floatingLabel>
            <Label>Username</Label>
            <Input
              placeholder="Username"
              value={username}
              onChangeText={(value) => setUsername(value)}
              required
            />
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              required
            />
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              required
            />
          </Item>
          <Item style={styles.item} picker>
            <Picker
              mode="dropdown"
              placeholder="Role"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={role}
              onValueChange={(value) => setRole(value)}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Player" value="player" />
              <Picker.Item label="Owner" value="owner" />
            </Picker>
          </Item>
          <Item style={styles.itemBtn}>
            <Button
              bordered
              dark
              style={styles.button}
              onPress={() => validate()}
            >
              <Text>Submit</Text>
            </Button>
            <Button
              bordered
              dark
              style={styles.button}
              onPress={() => move("LoginPage")}
            >
              <Text>Cancel</Text>
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

export default SignUp;
