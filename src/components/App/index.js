import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "semantic-ui-react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import { StyledHeader } from "./styled";
import { actions } from "../../state";
import { SearchList } from "../SearchList";
import { WatchList } from "../WatchList";

const CreateAccessToken = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("user_access_token")) {
      dispatch(actions.user.createAccessToken());
      history.push("/");
    }
  }, [dispatch, history]);
  return null;
};

const RequestToken = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("user_request_token")) {
      dispatch(actions.user.login());
    }
  }, [dispatch]);
  return null;
};

const Header = () => (
  <StyledHeader>
    <h2>My Tv Shows</h2>
    <Menu compact>
      <Menu.Item>
        <Link to="/search">Browse</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/watchlist">Watch List</Link>
      </Menu.Item>
    </Menu>
  </StyledHeader>
);

export const App = memo(() => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.sessionId) {
      dispatch(actions.user.createSession(user.accessToken));
      dispatch(actions.watchList.list());
    }
  }, [dispatch, user.accessToken, user.sessionId]);

  return (
    <BrowserRouter>
      {user.accountId ? (
        <>
          <Header />
          <Switch>
            <Route exact path="/search" component={SearchList} />
            <Route exact path="/watchlist" component={WatchList} />
            <Redirect from="/" to="/search" />
          </Switch>
        </>
      ) : (
        <Redirect to="/request_token" />
      )}
      <Route path="/request_token" component={RequestToken} />
      <Route exact path="/callback_success" component={CreateAccessToken} />
    </BrowserRouter>
  );
});
