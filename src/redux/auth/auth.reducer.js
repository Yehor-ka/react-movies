import * as types from './auth.types'
import { cookies } from '../../utils/cookies';


const initialState = {
  user: null,
  session_id: cookies.get('session_id'),
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        session_id: null,
      };
    default:
      return state;
  }
};


export default reducerApp;