import axios from "../../config/axiosInstances";
import { socket } from "../../config/socket";

export function createBooking(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/booking",
        data: payload,
      });
      socket.emit("finish addBooking");
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBookingByOwner(jwt, ownerId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          access_token: jwt,
        },
        url: "/booking/owner/" + ownerId,
      });
      dispatch({
        type: "set-booking",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBookingByPlayer(playerId, jwt) {
  console.log(jwt, "sdsdsdsd");
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/booking/player/${playerId}`,
        headers: {
          access_token: jwt,
        },
      });
      console.log(response.data, "<<< data my booking");
      dispatch({
        type: "set-booking",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateBookingFromOwner(id, jwt, payload, ownerId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "PUT",
        url: "/booking/" + id,
        headers: {
          access_token: jwt,
        },
        data: payload,
      });
      console.log(response, "ini dari actions booking.js update");
      dispatch(getBookingByOwner(jwt, ownerId));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getBooking(jwt) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/booking`,
        headers: {
          access_token: jwt,
        },
      });
      dispatch({
        type: "set-booking-all",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
