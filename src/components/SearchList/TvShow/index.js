import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Image,
  Button,
} from "semantic-ui-react";

import { actions } from '../../../state'

const TvShowAction = memo(({ media }) => {
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
  });
  
  export const TvShow = memo(({ media }) => (
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
  ));