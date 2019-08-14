import {
  WATCHLIST_LOAD,
  WATCHLIST_LOAD_SUCCESS,
  WATCHLIST_ACTION_PENDING,
  WATCHLIST_ADD_ITEM_COMPLETE,
  WATCHLIST_DELETE_ITEM_COMPLETE
} from "../../constants";

const defaultState = {
  items: {},
  dataIsLoading: false,
  actionPending: false
};

export const watchList = (state = defaultState, action) => {
  switch (action.type) {
    case WATCHLIST_LOAD:
      return {
        ...state,
        dataIsLoading: true
      };
    case WATCHLIST_LOAD_SUCCESS:
      const { items } = action.payload;
      return {
        ...state,
        items,
        dataIsLoading: false
      };
    case WATCHLIST_ACTION_PENDING:
      return {
        ...state,
        actionPending: true
      };
    case WATCHLIST_ADD_ITEM_COMPLETE:
      const { media } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [media.id]: media
        },
        actionPending: false
      };
    case WATCHLIST_DELETE_ITEM_COMPLETE:
      const { [action.payload.mediaId]: value, ...rest } = state.items;
      return {
        ...state,
        items: {
          ...rest
        },
        actionPending: false
      };
    default:
      return state;
  }
};
