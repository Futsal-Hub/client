import axios from "axios";

export const fetchCourt = (payload) => {
    return (dispatch, getState) => {
          axios({
            method: "GET",
            // url: "http://10.0.2.2:3000/users"
            url: "http://192.168.43.29:3000/court",
            headers: {
                access_token: payload.access_token
            }
          })
            .then(response => {
              dispatch({
                type: "set-court",
                payload: response.data
            })
          })
            .catch(err => console.log(err))
    }
}
