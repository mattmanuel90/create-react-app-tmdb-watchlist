import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../state";
import "./style.css";
import styled from "styled-components";
import { List, Button } from "semantic-ui-react";

const StyledWatchList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WatchList = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.watchList.items);

  useEffect(() => {
    dispatch(actions.watchList.list());
  }, [dispatch]);

  return (
    <StyledWatchList>
      <h2>Watch List</h2>
      <List divided size="big">
        {Object.values(items).map(item => (
          <List.Item key={item.id}>
            <List.Header>
              {item.title} ({item.year})
            </List.Header>
            <List.Content>{item.description}</List.Content>
            <List.Content floated="right">
              {" "}
              <Button
                icon="trash alternate"
                onClick={() => dispatch(actions.watchList.delete(item.id))}
              />
            </List.Content>
          </List.Item>
        ))}
      </List>
    </StyledWatchList>
  );
};
