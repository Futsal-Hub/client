import axios from "axios";

export default function signUp(payload) {
  axios({
    method: "POST",
    // url: "http://10.0.2.2:3000/register",
    url: "http://192.168.43.29:3000/register",
    data: payload
  })
    .then(result => {
      console.log(result.data)
      
    })
    .catch(err => console.log(err))
}