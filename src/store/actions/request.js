import axios from "../../config/axiosInstances";
import { getAccessToken } from "../../utility/token";

export function getReceivedRequest() {
  return async (dispatch, getState) => {
    const state = getState();
    const userLoggedIn = state.user;
    try {
      const access_token = await getAccessToken();
      const response = await axios({
        method: "GET",
        url: `/request/received/${userLoggedIn._id}`,
        headers: {
          access_token: access_token,
        },
      });

      console.log(response.data, "<<< request");
      dispatch({
        type: "set-receivedRequestPlayer",
        payload: response.data,
      });

      console.log(response.data, "<<< response fetch received");
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateRequest(id, newStatus, bookingId) {
  return async (dispatch, getState) => {
    try {
      const access_token = await getAccessToken();
      let booking;
      if (newStatus === "accepted") {
        booking = await axios({
          method: "GET",
          url: `/booking/${bookingId}`,
          headers: {
            access_token: access_token,
          },
        });
      }
      const state = getState();
      const user = state.user;
      const updated = await axios({
        method: "PATCH",
        url: `/booking/${bookingId}`,
        headers: {
          access_token: access_token,
        },
        data: {
          players: booking.data.players.concat(user),
        },
      });
      console.log(updated.data, "update players");
      const response = await axios({
        method: "PATCH",
        url: `/request/${id}`,
        headers: {
          access_token: access_token,
        },
        data: {
          status: newStatus,
        },
      });
      console.log(response.data, "<<< reponse update");
    } catch (error) {
      console.log(error);
    }
  };
}
