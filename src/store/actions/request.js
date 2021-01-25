import axios from "axios";
import { getAccessToken } from "../../utility/token";
export function getReceivedRequest() {
  return async (dispatch, getState) => {
    try {
      const access_token = await getAccessToken();
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/request/received/600eccdc7a84153ac3d83a10",
        headers: {
          access_token: access_token,
        },
      });
      dispatch({
        type: "set-receivedRequestPlayer",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateRequest(id, newStatus) {
  return async (dispatch, getState) => {
    try {
      const access_token = await getAccessToken();
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:3000/request/${id}`,
        headers: {
          access_token: access_token,
        },
        data: {
          status: newStatus,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
