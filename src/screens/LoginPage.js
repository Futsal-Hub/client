import React from "react";
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
} from "native-base";

const LoginPage = ({ navigation }) => {
  const toLandingPage = () => {
    navigation.navigate("MainApp");
  };
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Item>
            <Button bordered dark onPress={() => toLandingPage()}>
              <Text>Submit</Text>
            </Button>
            <Button bordered dark>
              <Text>Cancel</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default LoginPage;
