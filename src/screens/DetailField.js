import React, { useState } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAccessToken } from "../utility/token";
import {
  Button,
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Text,
  Picker,
  Right,
  Left,
  Row,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "../config/axiosInstances";

const DetailField = ({ route, navigation }) => {
  const { court } = route.params.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const player = useSelector((state) => state.user);

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
    console.log("masuk");
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
        axios({
          url: "/booking",
          method: "POST",
          headers: {
            access_token: res,
          },
          data: payload,
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Text style={styles.placename}>
            <Feather
              name="map-pin"
              size={18}
              color="white"
            /> {""}
            {court.name}
          </Text>
          <Text style={styles.tagline}>Price: Rp {court.price}</Text>
          <Text style={styles.type}>Type: {court.type}</Text>
          <Text style={styles.openHours}>
            Open: {court.schedule.open} to {court.schedule.close} WIB
          </Text>
          <Text style={styles.address}>Location: {court.address}</Text>
        </View>
      </Content>

      <View style={styles.viewForm}>
        <Form>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Book Now</Text>
            <Button
              style={{ alignSelf: "center" }}
              onPress={showDatePicker}
              title="Show date picker!"
            >
              <Text>Choose Date</Text>
            </Button>
          </View>
          <Item>
            <Input
              editable={false}
              required
              placeholder="Date"
              value={date}
              keyboardType={"number-pad"}
              onChangeText={(value) => setDate(value)}
            />
            <Input
              style={{ maxWidth: 100 }}
              editable={false}
              required
              placeholder="Time"
              value={time}
              keyboardType={"number-pad"}
              onChangeText={(value) => setTime(value)}
            />
            <Picker
              mode="dropdown"
              style={{ maxWidth: 100 }}
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
            <Button onPress={() => sendBooking()} style={{ margin: 10 }}>
              <Text>Booking</Text>
            </Button>
            <Button onPress={() => move("MainApp")} style={{ margin: 10 }}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Form>
        <View>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
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
    top: -130,
  },
  tagline: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  type: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  openHours: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -120,
  },
  address: {
    color: "black",
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 5,
    top: -100,
  },
  viewForm: {
    top: -30,
  }
});
