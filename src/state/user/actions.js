import { api } from "../../api";

export const actions = {
  login: () => async dispatch => {
    dispatch({ type: "USER_LOGIN" });
    const data = await api.user.requestToken();
    localStorage.setItem('user_request_token', data.request_token)
    window.location = `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`;
  },
  createAccessToken: () => async dispatch => {
    const requestToken = localStorage.getItem("user_request_token")
    const data = await api.user.createAccessToken(requestToken);
    localStorage.setItem('user_access_token', data.access_token)
    localStorage.setItem('user_account_id', data.account_id)
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: {
      accountId: data.account_id,
      accessToken: data.access_token,
      requestToken: localStorage.getItem('user_request_token'),
    }});
  },
  createSession: (accessToken) => async dispatch => {
    const data = await api.user.createSession(accessToken);
    
    dispatch({ type: "USER_CREATE_SESSION", payload: {
      sessionId: data.session_id,
    }});
  }
};
