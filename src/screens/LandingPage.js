import React, { useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Header,
  Content,
  Card,
  CardItem,
  Container,
  View,
} from "native-base";
import { removeToken } from "../utility/token";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { getCourt } from "../store/actions/court";
import { getAccessToken } from "../utility/token";
import { Feather } from "@expo/vector-icons";

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const courts = useSelector((state) => state.courts);

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourt(res));
      })
      .catch((err) => console.log(err));
  }, [dispatch, courts]);

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
      <Content>
        <Header style={{ flexDirection: "row", padding: 15, marginLeft: 320 }}>
          <TouchableOpacity onPress={() => logout()}>
            <Feather name="log-out" size={16} color="white" />
          </TouchableOpacity>
        </Header>
      </Content>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Top Fields</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 14, fontWeight: "bold", top: 10 }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <Content>
        <FlatList
          horizontal={true}
          data={courts}
          renderItem={({ item }) => {
            return (
              <Content style={{ paddingLeft: 20 }}>
                <TouchableOpacity>
                  <Image
                    source={{ uri: item.photos }}
                    style={{
                      width: 175,
                      marginRight: 10,
                      height: 220,
                      borderRadius: 10,
                    }}
                    keyExtractor={item._id}
                  />
                </TouchableOpacity>
                <View style={styles.imageOverlay}></View>
                <Feather
                  name="map-pin"
                  size={16}
                  color="white"
                  style={styles.imageLocation}
                />
                <Text style={styles.imageText}>{item.name}</Text>
              </Content>
            );
          }}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageOverlay: {
    width: 175,
    height: 240,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.2,
  },
  imageLocation: {
    position: "absolute",
    marginTop: 4,
    left: 10,
    bottom: 10,
  },
  imageText: {
    position: "absolute",
    color: "white",
    marginTop: 4,
    fontSize: 14,
    left: 30,
    bottom: 10,
  },
});

export default LandingPage;
