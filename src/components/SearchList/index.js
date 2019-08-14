import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { actions } from "../../state";
import "./style.css";
import styled from "styled-components";
import { Table, Image, Button, Search, Pagination, Segment } from "semantic-ui-react";

const StyledSearchList = styled(Segment)`
  display: flex;
  flex-direction: column;
`;

const ShowAction = ({ media }) => {
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

const Show = ({ media }) => (
  <Table.Row>
    <Table.Cell>
      <Image src={media.imageUrl} />
    </Table.Cell>
    <Table.Cell>{media.title}</Table.Cell>
    <Table.Cell>{media.year}</Table.Cell>
    <Table.Cell>{media.rating}</Table.Cell>
    <Table.Cell>{media.language}</Table.Cell>
    <Table.Cell>
      <ShowAction media={media} />
    </Table.Cell>
  </Table.Row>
);

const debouncedSearch = debounce(
  (dispatch, action) => {
    dispatch(action);
  },
  1000,
  { maxWait: 200 }
);

export const SearchList = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  const [activePage, setActivePage] = useState(1);
  const { results, totalPages } = useSelector(state => state.search);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    debouncedSearch(dispatch, actions.search.search(value));
  };

  const pageChangeHandler = (event, { activePage }) => {
    setActivePage(activePage)
    debouncedSearch(dispatch, actions.search.search(searchText, activePage));
  }

  return (
    <StyledSearchList>
      <Search aligned="right" onSearchChange={handleOnChange} showNoResults={false}  />
      <Pagination defaultActivePage={1} activePage={activePage} totalPages={totalPages} onPageChange={pageChangeHandler} />
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
            <Show key={item.id} media={item} />
          ))}
        </Table.Body>
      </Table>
      <Pagination defaultActivePage={1} activePage={activePage} totalPages={totalPages} onPageChange={pageChangeHandler} />
    </StyledSearchList>
  );
};
