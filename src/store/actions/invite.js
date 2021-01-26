import axios from "../../config/axiosInstances";
import { getAccessToken } from "../../utility/token";

export default function invitePlayer(destination) {
  console.log("masuk invite");
  return async (dispatch, getState) => {
    const state = getState()
    const userLoggedIn = state.user
    const payload = {
      destination,
      origin: {},
      status: "pending",
    };
    try {
      const access_token = await getAccessToken();
      payload.origin = userLoggedIn;
      const response = await axios({
        method: "POST",
        url: "/request",
        headers: {
          access_token: access_token,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error, "<<< error");
    }
  };
}
