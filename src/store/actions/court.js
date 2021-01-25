import axios from "axios";

export function getCourt() {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://10.0.2.2:3000/court",
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

export function getCourtId(id) {
    return async(dispatch, getState) => {
      try {
        const response = await axios({
          method:"GET",
          url:"http://10.0.2.2:3000/court/" + id,
        })
        dispatch({
          type: "set-courtbyid",
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }