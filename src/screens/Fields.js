import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCourt } from "../store/actions/court";
import { getAccessToken } from "../utility/token";
import { getDistance } from "geolib";
import {
  Header,
  Body,
  CardItem,
  Container,
  Content,
  Right,
  Text,
  Thumbnail,
  Card,
  Left,
  Button,
  Icon,
} from "native-base";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { removeToken } from "../utility/token";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;

const Fields = ({ navigation }) => {
  const courts = useSelector((state) => state.courts);
  const userLogin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAccessToken().then((res2) => {
      dispatch(getCourt(res2));
    });
  }, [dispatch]);

  const logout = () => {
    removeToken();
    dispatch({
      type: "set-role",
      payload: "",
    });
    navigation.navigate("LoginPage");
  };

  const listCourts = courts.map((court) => {
    court.distance = getDistance(
      { latitude: userLogin.position.lat, longitude: userLogin.position.lng },
      { latitude: court.position.lat, longitude: court.position.lng }
    );
    return court;
  });

  const move = (page, id) => {
    navigation.navigate(page, id);
  };

  return (
    <Container>
      <Content>
        <Header
          style={{
            flexDirection: "row",
            padding: 15,
            backgroundColor: "#EF7911",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, marginLeft: "auto" }}>
            Fields
          </Text>
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => logout()}
          >
            <Feather name="log-out" size={25} color="white" />
          </TouchableOpacity>
        </Header>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={listCourts}
          keyExtractor={(item) => item._id}
          horizontal
          contentContainerStyle={{
            alignItems: "center",
          }}
          snapToInterval={ITEM_SIZE}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -50, 0],
            });
            return (
              <View style={{ width: ITEM_SIZE, top: height - 550 }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 34,
                    transform: [{ translateY }],
                  }}
                >
                  <Image
                    source={{ uri: item.photos }}
                    style={styles.posterImage}
                  />
                  <Text style={styles.paragraph, {color: '#474b4d'}}>{item.name}</Text>
                  <Text style={styles.paragraph, {color: '#474b4d'}}>
                    {item.distance / 1000} KM
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonDetail}
                    onPress={() =>
                      move("DetailField", {
                        screens: "MainApp",
                        params: { item },
                      })
                    }
                  >
                    <Text style={styles.buttonText}>View Detail</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            );
          }}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.1,
    resizeMode: "cover",
    borderRadius: 24,
  },
  buttonDetail: {
    height: 30,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#EF7911",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },
});

export default Fields;
