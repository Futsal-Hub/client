import React, { useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { getReceivedRequest } from "../store/actions";
import { Header, Content, Card, CardItem, Body, Left, Right, H3 } from "native-base";
import { removeToken } from "../utility/token";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { getCourt } from "../store/actions/court";
import { getAccessToken } from "../utility/token";
import { Feather, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(); //Ignore all log notifications

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const courts = useSelector((state) => state.courts);
  const requests = useSelector((state) => state.receivedRequestPlayer);
  let receivedRequest = [...requests];
  receivedRequest = receivedRequest.filter((req) => req.status === "accepted");
  receivedRequest = receivedRequest.filter((req) => new Date(req.game.date.date) >= new Date());
  if (receivedRequest.length > 1) {
    receivedRequest.sort( (a, b) => {
      return new Date(a.game.date.date) - new Date(b.game.date.date);
    });    
  }

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        dispatch(getCourt(res));
      })
      .catch((err) => console.log(err));
  }, [dispatch, courts]);
  useEffect(() => {
      dispatch(getReceivedRequest())
  }, []);


  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  return (
    <View style={styles.container}>
      <Content>
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
          <Text style={{fontSize: 25, marginLeft: 10, marginTop: 10, marginBottom: 10, color: '#474b4d'}}>Hi, {user.username}!</Text>
        {
          (receivedRequest.length !== 0) ? 
          <Card style={{marginLeft: 10, marginRight: 10, backgroundColor: 'teal'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons style={{marginLeft: "auto"}} name="football" size={24} color='#474b4d' />
            <H3 style={{ marginRight: "auto"}}>Upcoming Match</H3>
          </View>
          <CardItem style={{backgroundColor: "aquamarine"}}>
            <Left>
              <Body>
                <H3>
                  {receivedRequest[0].game.court.name}
                </H3>
                <Text style={{color: '#474b4d'}}>
                {receivedRequest[0].game.players.length} players joined
              </Text>
              </Body>
            </Left>
            <Right>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <AntDesign name="calendar" size={20} color="#474b4d" style={{marginRight: 5}} />
                <Text>
                    {receivedRequest[0].game.date.date}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <AntDesign name="clockcircleo" size={20} color="#474b4d" style={{marginRight: 10}} />
                <Text>
                    {receivedRequest[0].game.date.time}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <MaterialCommunityIcons name="timer-sand" size={20} color="#474b4d" style={{marginRight: 18}} />
                <Text>
                    {receivedRequest[0].game.date.duration} hours
                </Text>
              </View>
            </Right>
          </CardItem>
      </Card>
      : 
      <H3 style={{marginLeft: "auto", color: '#474b4d', marginRight: "auto"}}>You Haven't Join Any Match Yet</H3>
      }
      </Content>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: '#474b4d'}}>Top Fields</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: '#474b4d', top: 10 }} onPress={() => navigation.navigate("Fields")}>
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
              <Content key={item._id} style={{ paddingLeft: 20 }}>
                <TouchableOpacity>
                  <Image
                    source={{ uri: item.photos }}
                    style={{
                      width: 175,
                      marginRight: 10,
                      height: 220,
                      borderRadius: 10
                    }}
                  />
                </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
