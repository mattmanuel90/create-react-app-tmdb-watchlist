import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_CREATE_SESSION,
  USER_LOGOUT,
} from "../../constants";

const defaultState = {
  user: null,
  requestToken: localStorage.getItem('user_request_token'),
  accountId: localStorage.getItem('user_account_id'),
  accessToken: localStorage.getItem('user_access_token'),
  sessionId: null,
  loading: false
};

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
