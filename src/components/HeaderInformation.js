import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { removeToken } from "../utility/token"
import {
  Text,
  Header
} from "native-base";

const HeaderInformation = ({navigation, page}) => {
  const dispatch = useDispatch();
  const navigate = useNavigation()
  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigate("LoginPage");
  };

  return (
    <Header style={{ flexDirection: "row", padding: 15, backgroundColor: '#EF7911'}}>
      <Text style={{color: 'white', fontSize: 20, marginLeft: "auto" }}>{page}</Text>
      <TouchableOpacity style={{marginLeft: "auto" }} onPress={() => logout()}>
        <Feather
          name="log-out"
          size={25}
          color="white"
        />
      </TouchableOpacity>
    </Header>
  )
};

export default HeaderInformation;
