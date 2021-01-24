import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconDefaultUser } from "../assets/icons";

const HeaderInformation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <IconDefaultUser />
        <View style={styles.textWrapper}>
          <Text style={styles.hello}>Hello Bro, </Text>
          <Text style={styles.username}>username</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderInformation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
  },
  textWrapper: {
    marginLeft: 9,
    top: 15
  },
  hello: {
    fontSize: 13,
  },
  username: {
    fontSize: 13,
  },
  jam: {
    textAlign: "right",
    fontSize: 11,
  },
  tanggal: {
    textAlign: "right",
    fontSize: 11,
  },
  jadwalInfo: {
    flexDirection: "row",
  },
  iconJadwal: {
    alignItems: "center",
  },
  labelNext: {
    fontSize: 11,
  },
});
