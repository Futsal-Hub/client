import axios from "axios";

export default function signUp(payload) {
  axios({
    method: "POST",
    url: "http://localhost:3000/register",
    data: payload
  })
    .then(result => {
      console.log(result.data)
      
    })
    .catch(err => console.log(err))
}