import axios from "axios";
import { getUserLogin } from '../../utility/userLogin'

export const fetchUser = () => {
    return (dispatch, getState) => {
          axios({
            method: "GET",
            url: "http://10.0.2.2:3000/users"
          })
            .then(response => {
              dispatch({
                type: "set-users",
                payload: response.data
            })
          })
            .catch(err => console.log(err))
    }
}

// export const fetchPlayer = () => {
//   return (dispatch, getState) => {
//   }
// }

