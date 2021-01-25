import axios from "axios";
import { getAccessToken } from "../../utility/token";
import { getUserLogin } from "../../utility/userLogin";

export default function invitePlayer(destination) {
  return async (dispatch, getState) => {
    const payload = {
      destination,
      origin: {
        _id: "unknown",
        name: "sangga",
      },
      status: "pending",
    };
    try {
      const access_token = await getAccessToken();
      const userLoggedIn = await getUserLogin();
      payload.origin = userLoggedIn;
      const response = await axios({
        method: "POST",
        url: "http://10.0.2.2:3000/request",
        headers: {
          access_token: access_token,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
