import axios from "../../config/axiosInstances";
import { socket } from "../../config/socket";
import { getAccessToken } from "../../utility/token";

export default function invitePlayer(destination, game) {
  console.log("masuk invite");
  return async (dispatch, getState) => {
    console.log(destination.username, "<<<< destination");
    const state = getState();
    const userLoggedIn = state.user;
    const payload = {
      destination,
      origin: {},
      status: "pending",
      game: game,
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
      // console.log(response.data, "<< response");
      socket.emit("invite sent");
    } catch (error) {
      console.log(error, "<<< error");
    }
  };
}
