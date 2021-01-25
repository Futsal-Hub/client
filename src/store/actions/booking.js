import axios from "../../config/axiosInstances";
import { socket } from "../../config/socket";

export function createBooking(payload) {
  return async(dispatch, getState) => {
    try {
      const response = await axios({
        method:"POST",
        url:"/booking",
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
        url:"/booking/owner/" + ownerId,
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
        url:"/booking/player/" + playerId,
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

