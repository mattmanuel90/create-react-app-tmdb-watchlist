import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  Table,
  Image,
  Button,
  Search,
  Pagination,
  Segment
} from "semantic-ui-react";

import { StyledSearchList } from "./styled";
import { actions } from "../../state";

const TvShowAction = ({ media }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { items, actionPending } = useSelector(state => state.watchList);

  useEffect(() => {
    if (!actionPending) {
      setIsLoading(false);
    }
  }, [actionPending]);

  const deleteActionHandler = () => {
    setIsLoading(true);
    dispatch(actions.watchList.delete(media.id));
  };

  const addActionHandler = () => {
    setIsLoading(true);
    dispatch(actions.watchList.add(media));
  };

  if (items[media.id]) {
    return (
      <Button
        icon="trash alternate"
        disabled={isLoading}
        onClick={deleteActionHandler}
      />
    );
  }
  return <Button icon="add" disabled={isLoading} onClick={addActionHandler} />;
};

const TvShow = ({ media }) => (
  <Table.Row>
    <Table.Cell>
      <Image src={media.imageUrl} alt="Poster" />
    </Table.Cell>
    <Table.Cell>{media.title}</Table.Cell>
    <Table.Cell>{media.year}</Table.Cell>
    <Table.Cell>{media.rating}%</Table.Cell>
    <Table.Cell>{media.language}</Table.Cell>
    <Table.Cell>
      <TvShowAction media={media} />
    </Table.Cell>
  </Table.Row>
);

const debouncedSearch = debounce(
  (dispatch, action) => {
    dispatch(action);
  },
  500,
  { maxWait: 0, leading: false, trailing: true }
);

export const SearchList = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState(1);
  const { loading, results, totalPages } = useSelector(state => state.media);

  const onSearchChangeHandler = event => {
    const { value } = event.target;
    setSearchText(value);
    setActivePage(1);
    debouncedSearch(dispatch, actions.media.search(value));
  };

  const pageChangeHandler = (event, { activePage }) => {
    setActivePage(activePage);
    dispatch(actions.media.search(searchText, activePage));
  };

  return (
    <StyledSearchList>
      <Segment vertical>
        <Search onSearchChange={onSearchChangeHandler} showNoResults={false} />
      </Segment>
      <Segment vertical loading={loading}>
        <Pagination
          {...{ activePage, totalPages }}
          onPageChange={pageChangeHandler}
        />
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Cover</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Add/Remove Watchlist</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(results).map(item => (
              <TvShow key={item.id} media={item} />
            ))}
          </Table.Body>
        </Table>
        {totalPages > 1 && (
          <Pagination
            {...{ activePage, totalPages }}
            onPageChange={pageChangeHandler}
          />
        )}
      </Segment>
    </StyledSearchList>
  );
};
