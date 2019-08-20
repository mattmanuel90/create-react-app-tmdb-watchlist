import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  Table,
  Search,
  Pagination,
  Segment
} from "semantic-ui-react";

import { TvShow } from './TvShow';
import { StyledSearchList } from "./styled";
import { actions } from "../../state";

const debouncedSearch = debounce(
  (dispatch, action) => {
    dispatch(action);
  },
  500,
  { maxWait: 0, leading: false, trailing: true }
);

const SearchResultsTable = memo(({ results }) => (
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
));

export const SearchList = memo(() => {
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
        <SearchResultsTable results={results} />
        {totalPages > 1 && (
          <Pagination
            {...{ activePage, totalPages }}
            onPageChange={pageChangeHandler}
          />
        )}
      </Segment>
    </StyledSearchList>
  );
});
