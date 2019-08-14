import { api } from "../../api";
import { keyBy } from "lodash";
import * as constants from "../../constants";

export const actions = {
  list: (pageNum = 1) => async (
    dispatch,
    getState
  ) => {
    const {
      user: { accessToken, accountId }
    } = getState();
    dispatch({ type: constants.WATCHLIST_LOAD });

    const data = await api.media.listTvWatchList(
      accessToken,
      accountId,
      pageNum
    );

    const transformed = data.results.map(i => ({
      id: i.id,
      year: parseInt(i.first_air_date),
      title: i.name,
      description: i.overview
    }));

    const items = keyBy(transformed, "id");

    dispatch({
      type: constants.WATCHLIST_LOAD_SUCCESS,
      payload: {
        items
      }
    });
  },
  add: media => async (dispatch, getState) => {
    const {
      user: { accountId, sessionId }
    } = getState();
    dispatch({ type: constants.WATCHLIST_ACTION_PENDING });
    await api.media.addToTvWatchList(media.id, accountId, sessionId);
    dispatch({
      type: constants.WATCHLIST_ADD_ITEM_COMPLETE,
      payload: {
        media: {
          id: media.id
        }
      }
    });
  },
  delete: mediaId => async (dispatch, getState) => {
    const {
      user: { accountId, sessionId }
    } = getState();
    dispatch({ type: constants.WATCHLIST_ACTION_PENDING });
    await api.media.deleteFromTvWatchList(mediaId, accountId, sessionId);
    dispatch({
      type: constants.WATCHLIST_DELETE_ITEM_COMPLETE,
      payload: {
        mediaId
      }
    });
  }
};
