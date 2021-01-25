import axios from "axios";
import { getUserLogin, get } from "../../utility/userLogin";
import { getAccessToken } from "../../utility/token";

export const fetchUser = () => {
  return (dispatch, getState) => {
    getAccessToken()
      .then((res) => {
        return axios({
          method: "GET",
          url: "http://10.0.2.2:3000/users",
          headers: {
            access_token: res,
          },
        });
      })
      .then((response) => {
        dispatch({
          type: "set-users",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err, "<<< err fetching user");
      });
  };
};

// export const fetchPlayer = () => {
//   return (dispatch, getState) => {
//   }
// }
