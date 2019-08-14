import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_CREATE_SESSION,
  USER_LOGOUT,
} from "../../constants";
import defaultState from './init';

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loading: true
      };
    case USER_LOGIN_SUCCESS:
      const { requestToken , accountId, accessToken } = action.payload
      return {
        ...state,
        requestToken,
        accountId,
        accessToken,
        loading: false
      };
    case USER_CREATE_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
