import axios from "axios";

const apiURL = "http://192.168.0.14:3000";

export function FETCH_TAGS({ userCred }) {
  return (dispatch) => {
    axios({
      url: `${apiURL}/tags`,
      method: "GET",
      headers: {
        access_token: userCred.access_token,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "SET_TAGS",
          payload: data.tags,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
