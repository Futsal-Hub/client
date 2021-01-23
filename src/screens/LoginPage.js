import React, {useState} from "react";
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Picker } from "native-base";
import { login } from '../store/actions'

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isValid, setValid] = useState("")

  const move = (page) => {
    navigation.navigate(page);
    setUsername("")
    setPassword("")
  };

  const validate = () => {
    if (!username || !password) {
      setValid("Please Fill All Form !")
      setTimeout(() => {
        setValid("")
      }, 3000);
    } else {
      const payload = {
        username,
        password
      }
      login(payload)
      setUsername("")
      setPassword("")
      move("MainApp")
    }
  }

  return (
    <Container>
      <Header style={styles.header}>
        <Text>Buat Logo Dll</Text>
      </Header>
      {
        isValid ? <Text style={{color: 'red', marginLeft: 'auto', marginRight: 'auto'}}>{isValid}</Text> : <Text></Text>
      }
      <Form style={styles.form}>
        <Item style={styles.item}>
          <Input placeholder="Username" value={username} onChangeText={(value) => setUsername(value)} />
        </Item>
        <Item style={styles.item}>
          <Input placeholder="Password" value={password} secureTextEntry={true} onChangeText={(value) => setPassword(value)}/>
        </Item>
        <Item style={styles.itemBtn}>
          <Button bordered dark style={styles.button} onPress={() => validate()}>
            <Text>Sign In</Text>
          </Button>
          <Button bordered dark style={styles.button} onPress={() => move("SignUp")}>
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
    backgroundColor: 'white',
    borderBottomWidth: 0,
    elevation: 0
  },
  flex: {
    width: 300,
    flex: 1
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20
  },
  item: {
    marginTop: 5,
    marginLeft: 10,
  },
  itemBtn: {
    borderBottomWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: '#ff9900'
  }
}
export default LoginPage;
