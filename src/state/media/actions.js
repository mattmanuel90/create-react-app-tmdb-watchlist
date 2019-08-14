import { api } from "../../api";
import { keyBy } from "lodash";
import * as constants from "../../constants";

const TMDB_IMAGE_URL = "http://image.tmdb.org/t/p/w45";

export const actions = {
  search: (query, pageNum = 1) => async dispatch => {
    dispatch({
      type: constants.SEARCH_MEDIA,
      payload: {
        query
      }
    });

    const data = await api.media.searchTv(query, pageNum);

    const { page, total_pages, results = [] } = data;

    const transformed = results.map(i => ({
      id: i.id,
      year: parseInt(i.first_air_date) || "n/a",
      title: i.name,
      description: i.overview,
      rating: (i.vote_average * 10).toFixed(1),
      language: i.original_language,
      imageUrl: `${TMDB_IMAGE_URL}/${i.poster_path}`
    }));

    dispatch({
      type: constants.SEARCH_MEDIA_SUCCESS,
      payload: {
        results: keyBy(transformed, "id"),
        pageNum: page,
        totalPages: total_pages
      }
    });
  }
};
