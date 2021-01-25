import axios from "../../config/axiosInstances";

export function getCourt(jwt) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          access_token: jwt,
        },
        url: "/court",
      });
      dispatch({
        type: "set-court",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCourtId(id, jwt) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        url: "/court/" + id,
        headers: {
          access_token: jwt,
        },
      });
      dispatch({
        type: "set-courtbyid",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCourt(id, jwt) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: "/court/" + id,
        headers: {
          access_token: jwt,
        },
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
}