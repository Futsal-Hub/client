import axios from "../../config/axiosInstances";

export default function login(payload) {
  axios({
    method: "POST",
    url: "/login",
    data: payload
  })
}