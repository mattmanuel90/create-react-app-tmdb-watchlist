import axios from "axios";

const instance_v4 = axios.create({
  baseURL: 'https://api.themoviedb.org/4/',
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_READ_ACCESS_TOKEN}`,
    "Content-type": "application/json;charset=UTF-8"
  }
});

const instance_v3 = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000
});

const API_KEY = process.env.REACT_APP_API_KEY;

export const api = {
  user: {
    requestToken: async () => {
      const { data = {} } = await instance_v4.post("/auth/request_token", {
        redirect_to: "http://localhost:3000/callback_success"
      });
      return data;
    },
    createAccessToken: async requestToken => {
      const { data = {} } = await instance_v4.post("/auth/access_token", {
        request_token: requestToken
      });
      return data;
    },
    createSession: async accessToken => {
      const { data = {} } = await instance_v3.post(
        "/authentication/session/convert/4",
        {
          access_token: accessToken
        },
        {
          params: {
            api_key: API_KEY
          }
        }
      );
      return data;
    }
  },
  media: {
    searchTv: async (query, pageNum) => {
      const { data = {} } = await instance_v3.get(
        `/search/tv`,
        {
          params: {
            query,
            page: pageNum,
            api_key: API_KEY
          }
        }
      );
      return data;
    },
    listTvWatchList: async (accessToken, accountId, pageNum) => {
      const { data = {} } = await instance_v4.get(
        `/account/${accountId}/tv/watchlist`,
        {},
        {
          params: {
            page: pageNum
          },
          headers: {
            Authorization: `Bearer lolalal`,
            "Content-type": "application/json;charset=UTF-8"
          }
        }
      );

      return data;
    },
    addToTvWatchList: async (mediaId, accountId, sessionId) => {
      await instance_v3.post(
        `/account/${accountId}/watchlist`,
        {
          media_type: "tv",
          media_id: mediaId,
          watchlist: true
        },
        {
          params: {
            api_key: API_KEY,
            session_id: sessionId
          }
        }
      );
    },
    deleteFromTvWatchList: async (id, accountId, sessionId) => {
      await instance_v3.post(
        `/account/${accountId}/watchlist`,
        {
          media_type: "tv",
          media_id: id,
          watchlist: false
        },
        {
          params: {
            api_key: API_KEY,
            session_id: sessionId
          }
        }
      );
    }
  }
};
