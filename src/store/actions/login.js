import axios from "axios";

export default function login(payload) {
  axios({
    method: "POST",
    url: "http://10.0.2.2:3000/login",
    data: payload
  })
}