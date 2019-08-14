const initialState = {
  user: null,
  requestToken: localStorage.getItem("user_request_token"),
  accountId: localStorage.getItem("user_account_id"),
  accessToken: localStorage.getItem("user_access_token"),
  sessionId: null,
  loading: false
};

export default initialState;
