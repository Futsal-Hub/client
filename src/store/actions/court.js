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

export function getCourtByOwner(jwt, id) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          access_token: jwt
        },
        url: "/court/owner/"+id
      })
      dispatch({
        type: "set-court",
        payload: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }
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

export function addCourt(jwt, formData, idOwner) {
  return async (dispatch, getState) => {
    try {
      axios({
        url: "/court",
        method: "POST",
        headers: {
          access_token: jwt,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          console.log(res.data, "hasil addfield");
          dispatch(getCourtByOwner(jwt, idOwner))
        })
        .catch((err) => console.log(err));
    } catch (erer) {
      console.log(err)
    }
  }
}

export function editCourt(jwt, id, payload, idOwner) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        url: "/court/" + id,
        method: "PUT",
        headers: {
          access_token: jwt,
        },
        data: payload,
      })
      dispatch(getCourtByOwner(jwt, idOwner))
    } catch (err) {
      console.log(err)
    }
  }
}

export function deleteCourt(id, jwt, id_owner) {
  return async (dispatch, getState) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: "/court/" + id,
        headers: {
          access_token: jwt,
        },
      });
      dispatch(getCourtByOwner(jwt, id_owner))
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
}