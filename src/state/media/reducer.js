import * as constants from "../../constants";
import defaultState from './init';

export const media = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_MEDIA:
      return {
        ...state,
        loading: true
      };
    case constants.SEARCH_MEDIA_SUCCESS:
      const { results, pageNum, totalPages } = action.payload;
      return {
        ...state,
        results,
        pageNum,
        totalPages,
        loading: false
      };
    default:
      return state;
  }
};
