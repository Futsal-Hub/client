import React from "react";
import { Button, Container, Content, Form, Text, Item, Input } from "native-base";

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <Form>
          <Text>LoginPage</Text>
          <Item>
            <Input placeholder="fajar"/>
          </Item>
          <Item>
            <Input placeholder="gblg" />
          </Item>
          <Item last>
            <Input placeholder="fajar gblg" />
          </Item>
          <Button primary><Text>Submit</Text></Button>
        </Form>
      </Content>
    </Container>
  );
};

export default LoginPage
