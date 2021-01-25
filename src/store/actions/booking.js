import axios from "axios";
import { socket } from "../../config/socket";

export function createBooking(payload) {
  return async(dispatch, getState) => {
    try {
      const response = await axios({
        method:"POST",
        url:"http://10.0.2.2:3000/booking",
        data: payload
      })
      socket.emit("finish addBooking")
    } catch (error) {
      console.log(error)
    }
  }
}


export function getBookingByOwner(ownerId) {
  return async(dispatch, getState) => {
    try {
      const response = await axios({
        method:"GET",
        url:"http://10.0.2.2:3000/booking/owner/" + ownerId,
      })
      dispatch({
        type: "set-booking",
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}


export function getBookingByPlayer(playerId) {
  return async(dispatch, getState) => {
    try {
      const response = await axios({
        method:"GET",
        url:"http://10.0.2.2:3000/booking/player/" + playerId,
      })
      dispatch({
        type: "set-booking",
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

