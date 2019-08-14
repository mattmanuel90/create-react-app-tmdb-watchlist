import * as constants from "../../constants";
const defaultState = {
  results: {},
  loading: false,
  pageNum: 1,
  totalPages: 1
};

export const search = (state = defaultState, action) => {
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
