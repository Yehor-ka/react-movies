import { fetchAPI, API_KEY_3, API_URL } from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: 'REQUEST_AUTH'
  })
  fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
  .then(user => {
    dispatch(updateAuth({user, session_id}));
  })
  .catch(error => {
    dispatch({
      type: 'ERROR_AUTH',
      payload: error
    })
  })
}

export const updateAuth = (payload) => {
  return {
    type: 'UPDATE_AUTH',
    payload,
  }
};

export const onLogOut = () => {
  return {
    type: 'LOGOUT',
  };
};
