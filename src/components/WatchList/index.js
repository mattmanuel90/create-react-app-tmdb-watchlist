import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Segment } from "semantic-ui-react";

import { StyledWatchList } from "./styled";
import { actions } from "../../state";

const WatchListItem = memo(({ item }) => {
  const dispatch = useDispatch();
  return (
    <List.Item>
      <List.Header>
        {item.title} ({item.year})
      </List.Header>
      <List.Content>{item.description}</List.Content>
      <List.Content floated="right">
        <Button
          icon="trash alternate"
          onClick={() => dispatch(actions.watchList.delete(item.id))}
        />
      </List.Content>
    </List.Item>
  );
});

export const WatchList = memo(() => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.watchList);

  useEffect(() => {
    dispatch(actions.watchList.list());
  }, [dispatch]);

  return (
    <StyledWatchList>
      <Segment vertical>
        <h2>Watch List</h2>
      </Segment>
      <Segment vertical loading={loading}>
        <List divided size="big">
          {Object.values(items).map(item => (
            <WatchListItem key={item.id} item={item} />
          ))}
        </List>
      </Segment>
    </StyledWatchList>
  );
});
