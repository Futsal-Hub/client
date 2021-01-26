import axios from "../../config/axiosInstances";
import { getAccessToken } from "../../utility/token";
import { getUserLogin } from "../../utility/userLogin";

export function getReceivedRequest() {
  return async (dispatch, getState) => {
    try {
      const userLoggedIn = await getUserLogin();
      const access_token = await getAccessToken();
      const response = await axios({
        method: "GET",
        url: `/request/received/${userLoggedIn._id}`,
        headers: {
          access_token: access_token,
        },
      });
<<<<<<< HEAD

=======
      // response.data = response.data.filter((item) => item.status === "pending");
>>>>>>> development
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

export function updateRequest(id, newStatus) {
  return async (dispatch, getState) => {
    try {
      const access_token = await getAccessToken();
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
      console.log(response, "<<< reponse update");
    } catch (error) {
      console.log(error);
    }
  };
}
