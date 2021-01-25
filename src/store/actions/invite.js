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
      console.log(userLoggedIn, "<< user logged in inviet");
      // const response = await axios({
      //   method: "POST",
      //   url: "http://localhost:3000/request",
      //   headers: {
      //     access_token: access_token,
      //   },
      //   data: payload,
      // });
    } catch (error) {
      console.log(error);
    }
  };
}
