import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "../config/axiosInstances";
import { StyleSheet, View, Alert, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../utility/token";
import { Button, Container, Content, Form, Item, Input, Text, Picker } from "native-base";
import { Feather } from "@expo/vector-icons";
import { getBookingByPlayer } from "../store/actions/booking";
import { socket } from "../config/socket";
import { FontAwesome } from '@expo/vector-icons'; 
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(); //Ignore all log notifications

const DetailField = ({ route, navigation }) => {
  const { item: court } = route.params.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const player = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let price =
    "Rp. " +
    Number(court.price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
    ",00";

  const move = (page) => {
    navigation.navigate(page);
  };

  // date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (choosenDate) => {
    console.log(
      choosenDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );

    const splitted = choosenDate
      .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      .split(" ");
    const newDate = `${splitted[0]} ${splitted[2]} ${splitted[1]} ${splitted[4]}`;
    const newTime = splitted[3];
    setDate(newDate);
    setTime(newTime);
  };

  const sendBooking = () => {
    if (!date || !time || !duration) {
      Alert.alert(
        "Notification",
        "Please fill all form"
      )
    } else {
      console.log("masuk sendbooking");
      let access_token;
      const payload = {
        schedule: court.schedule,
        host: player,
        players: [player],
        court: court,
        date: {
          date,
          time,
          duration,
        },
        status: "pending",
      };
      getAccessToken()
        .then((res) => {
          access_token = res;
          axios({
            url: "/booking",
            method: "POST",
            headers: {
              access_token: res,
            },
            data: payload,
          })
            .then((res) => {
              dispatch(getBookingByPlayer(player._id, access_token));
              console.log(res.data);
              socket.emit("doneFetching");
              Alert.alert(
                "Notification",
                "You Have Successfully Send Request To Book This Court!",
                [
                  {
                    text: "Ok",
                    onPress: () => navigation.navigate("MainApp")
                  }
                ]
              )
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Content scrollEnabled={false}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <ImageBackground
            source={{ uri: court.photos }}
            style={styles.image}
            imageStyle={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
          <Text style={styles.placename}>{court.name}</Text>
          <Text style={styles.type}>{court.type}</Text>
          <Text style={styles.tagline}>{price}</Text>
          <Text style={styles.openHours}>
            {court.schedule.open} to {court.schedule.close} WIB
          </Text>
          <Text style={styles.address}>
            <Feather name="map-pin" size={16} color="red" /> {""}
            {court.address}
          </Text>
        </View>

        <View style={styles.viewForm}>
          <Form>
            <Item style={{ bottom: 150, marginRight: 20 }}>
              <Input
                editable={false}
                onPress={showDatePicker}
                style={{marginLeft: 10}}
                required
                placeholder="Date"
                value={date}
                keyboardType={"number-pad"}
                onChangeText={(value) => setDate(value)}
              />
              <Input
                editable={false}
                style={{marginLeft: 0}}
                required
                onPress={showDatePicker}
                placeholder="Time"
                value={time}
                keyboardType={"number-pad"}
                onChangeText={(value) => setTime(value)}
              />
              <FontAwesome style={{width: 50}} name="calendar" size={30} color="#EF7911" onPress={showDatePicker} />
            </Item>
            <Item style={{ bottom: 150, marginLeft: 20, marginRight: 20 }}>
              <Picker
                mode="dropdown"
                placeholder="Duration"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={duration}
                onValueChange={(value) => setDuration(value)}
              >
                <Picker.Item label="Duration" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Button style={styles.buttonBack} onPress={() => navigation.navigate("Fields")}>
                <Text style={{ marginLeft: 20, marginRight: 20 }}>Back</Text>
              </Button>
              <Button onPress={() => sendBooking()} style={styles.buttonBook}>
                <Text style={{ marginLeft: 20, marginRight: 20 }}>Booking</Text>
              </Button>
              <View>
                <Button
                  onPress={() => move("MainApp")}
                  style={{ bottom: 590, right: 225 }}
                  transparent
                >
                  <Feather name="arrow-left" size={24} color="#EF7911" />
                </Button>
              </View>
            </View>
          </Form>
        </View>
        <View>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>
      </Content>
    </Container>
  );
};

export default DetailField;

const styles = StyleSheet.create({
  image: {
    height: 250,
    justifyContent: "flex-end",
  },
  placename: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 14,
    top: -125,
  },
  tagline: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  type: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  openHours: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  address: {
    color: "grey",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -100,
  },
  viewForm: {
    top: 70,
  },
  buttonBook: {
    bottom: 100,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#EF7911",
  },
  buttonBack: {
    bottom: 100,
    borderRadius: 30,
    marginLeft: 40,
    marginRight: 10,
    backgroundColor: "#EF7911",
  },
  choosenDate: {
    bottom: 0,
    left: 40,
    borderRadius: 30,
    backgroundColor: "#007965",
  },
});
