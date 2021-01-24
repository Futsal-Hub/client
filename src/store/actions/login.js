import axios from "axios";

export default function login(payload) {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: "http://10.0.2.2:3000/login",
      data: payload
    })
      .then(result => {
        setAccessToken(JSON.stringify(result.data.access_token))
        dispatch({
          type: "set-role",
          payload: result.data.user.role
        })
      })
      .catch(err => console.log(err))
  }
}