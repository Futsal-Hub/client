import axios from "../../config/axiosInstances";
import { getAccessToken } from "../../utility/token";
import { getUserLogin } from "../../utility/userLogin";

export default function invitePlayer(destination) {
  console.log("masuk invite");
  return async (dispatch, getState) => {
    const payload = {
      destination,
      origin: {},
      status: "pending",
    };
    try {
      console.log("masuk try catch");
      const access_token = await getAccessToken();
      const userLoggedIn = await getUserLogin();
      payload.origin = userLoggedIn;
      const response = await axios({
        method: "POST",
        url: "/request",
        headers: {
          access_token: access_token,
        },
        data: payload,
      });
      console.log(response.data, "<< response");
    } catch (error) {
      console.log(error, "<<< error");
    }
  };
}
