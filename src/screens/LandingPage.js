import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Header, Content, Card, CardItem, Container, View } from "native-base";
import * as Location from "expo-location";
import Swipper from "react-native-swiper";
import HeaderInformation from "../components/HeaderInformation";

const LandingPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Container>
      <Header style={{ alignItems: "center", padding: 5, marginLeft: -220 }}>
        <HeaderInformation />
      </Header>
      <Content>
        <View>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Swipper autoplay height={200}>
            <View style={styles.slide}>
              <Image
                source={require("../assets/images/fieldsDummy.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/images/fieldsDummy1.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/images/fieldsDummy2.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/images/fieldsDummy3.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/images/fieldsDummy4.jpg")}
                style={styles.sliderImage}
              />
            </View>
          </Swipper>
        </View>
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
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
});

export default LandingPage;
