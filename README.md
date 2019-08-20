# TMDB TV Show Watchlist

https://vigorous-lumiere-62fac5.netlify.com

Notes: 
- Uses JWT authentication with TMDB version 4 API
- Uses Redux
- No tests. Used the Hooks API and didnt figure out in time how to test my presentational components with Enzyme. Need to explore further with react-testing-library
- Not responsive, and doesnt handle errors with the API.
- If for any reason the authentication process fails or session is expired, remove all values from localStorage (i.e user_access_token, user_request_token, user_account_id) to start from a clean state.

## Setup
* npm run start

## TODO
Move JWT from locale storage into session cookie
