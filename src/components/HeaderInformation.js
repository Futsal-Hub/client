import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Text, Header } from "native-base";
import {removeToken} from '../utility/token'

const HeaderInformation = ({ navigation, page }) => {
  const dispatch = useDispatch();

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  if (page === "Home") {
    return (
      <Header
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "#EF7911",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, marginLeft: "auto" }}>
          Home
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
    );
  } else {
    return (
      <Header
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "#EF7911",
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, marginLeft: "auto" }}>
          {page}
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
    );
  }
};

export default HeaderInformation;
