import axios from "../../config/axiosInstances";

export const fetchUser = (jwt) => {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: "/users",
      headers: {
        access_token: jwt,
      },
    })
      .then((response) => {
        dispatch({
          type: "set-users",
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
