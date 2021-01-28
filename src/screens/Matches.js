import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../utility/token";
import { getDistance } from "geolib";
import { invitePlayer } from "../store/actions";
import { getBooking } from "../store/actions";
import { Alert, TouchableOpacity, FlatList, View, Image, StatusBar } from "react-native";
import { Container, Content, Text, Header } from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import { removeToken } from "../utility/token";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SPACING = 20;
const AVATAR_SIZE = 70;

const Matches = ({ navigation }) => {
  const bookings = useSelector((state) => state.allBookings);
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(userLogin.position, "<<<");

  useEffect(() => {
    getAccessToken().then((res1) => {
      dispatch(getBooking(res1));
    });
  }, []);

  const handleJoin = (player, booking) => {
    Alert.alert(
      "Confirmation",
      "Are you sure want to join this game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(invitePlayer(player, booking)) },
      ],
      { cancelable: false }
    );
  };

  const listMatches = bookings.map((match) => {
    match.court.distance = getDistance(
      { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
      {
        latitude: match.court.position.lat,
        longitude: match.court.position.lng,
      }
    );
    return match;
  });

  const activeMatches = listMatches.filter((activeMatch) => {
    return activeMatch.status === "accepted";
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
          Nearby Matches
        </Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => logout()}
        >
          <Feather name="log-out" size={25} color="white" />
        </TouchableOpacity>
      </Header>
      <Content style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={activeMatches}
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
                  source={{ uri: item.court.photos }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: 10,
                    marginRight: SPACING / 2,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: "#555555",
                    }}
                  >
                    {item.court.name}
                  </Text>
                  <Text>{item.host.username}</Text>
                  <Text style={{ fontSize: 14, opacity: 0.7 }}>
                    {item.court.distance / 1000} KM
                  </Text>
                </View>
                <View style={{ marginLeft: "auto" }}>
                  <AntDesign
                    name="login"
                    size={30}
                    color="#EF7911"
                    onPress={() => handleJoin(item.host, item)}
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "auto",
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </Content>
    </Container>
  );
};

export default Matches;
