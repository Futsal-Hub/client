import axios from "../../config/axiosInstances";

export default function signUp(payload) {
  axios({
    method: "POST",
    url: "/register",
    data: payload
  })
    .then(result => {
      console.log(result.data)
      
    })
    .catch(err => console.log(err))
}