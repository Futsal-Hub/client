import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  IconHome,
  IconHomeActive,
  IconMatches,
  IconMatchesActive,
  IconPlayers,
  IconPlayersActive,
  IconFields,
  IconFieldsActive,
  IconListRequest,
  IconListRequestActive,
} from "../assets/icons";

const TabItem = ({ label, isFocused, onLongPress, onPress }) => {
  const Icon = () => {
    if (label === "Home") {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === "Fields") {
      return isFocused ? <IconFieldsActive /> : <IconFields />;
    }
    if (label === "Players") {
      return isFocused ? <IconPlayersActive /> : <IconPlayers />;
    }
    if (label === "Matches") {
      return isFocused ? <IconMatchesActive /> : <IconMatches />;
    }
    if (label === "Request") {
      return isFocused ? <IconListRequestActive /> : <IconListRequest />;
    }
  };
  useEffect(() => {
    Icon();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={isFocused ? styles.containerFocused : styles.container}
    >
      <Icon />
      {/* {isFocused && <Text style={styles.text}>{label.toUpperCase()}</Text>} */}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    padding: 5,
  },
  containerFocused: {
    alignContent: "center",
    padding: 5,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: {
    color: "#f67d11",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
