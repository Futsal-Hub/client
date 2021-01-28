import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReceivedRequest, updateRequest } from "../store/actions";
import { TouchableOpacity, View, FlatList, Image, StatusBar } from "react-native";
import {  Container, Content, Text, Header } from "native-base";
import { Feather } from "@expo/vector-icons";
import { removeToken } from "../utility/token";
import { socket } from "../config/socket";
import { AntDesign } from '@expo/vector-icons'; 
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SPACING = 20;
const AVATAR_SIZE = 70;

const Request = ({navigation}) => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.receivedRequestPlayer);
  let receivedRequest = [...requests];
  receivedRequest = receivedRequest.filter((req) => req.status === "pending");
  React.useEffect(() => {
    dispatch(getReceivedRequest());
  }, []);
  socket.on("fetch request", () => {
    dispatch(getReceivedRequest());
  });

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  return (
    <Container>
      <Header
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "#EF7911",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, marginLeft: "auto" }}>
          Request Join
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
      <Content style={{flex: 1}}>
      <FlatList
          data={receivedRequest}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 20,
          }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  padding: SPACING,
                  marginBottom: SPACING,
                  backgroundColor: "whitesmoke",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                }}
              >
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/${Math.floor(
                      Math.random() * (1000 - 50 + 1) + 50
                    )}`,
                  }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 22, fontWeight: "700", color: '#555555' }}>
                    {item.origin.username}
                  </Text>
                  <Text
                    style={{ fontSize: 18, opacity: 0.8, color: "#0099cc" }}
                  >
                    {item.origin.email}
                  </Text>
                  <Text style={{ fontSize: 14, opacity: 0.7 }}>
                    {item.destination.distance / 1000} KM
                  </Text>
                </View>
                <View style={{marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                  <AntDesign style={{marginBottom: 5}} name="checksquareo" size={24} color="blue" onPress={() => dispatch(updateRequest(item._id, "accepted", item.game._id))} />
                  <AntDesign style={{marginTop: 5}} name="closesquareo" size={24} color="red" onPress={() => dispatch(updateRequest(item._id, "Rejected", item.game._id))} />
                </View>
              </View>
            );
          }}
        />
      </Content>
    </Container>
  );
};

export default Request;
