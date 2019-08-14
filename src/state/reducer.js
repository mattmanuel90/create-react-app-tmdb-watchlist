import { combineReducers } from "redux";
import { media } from "./media/reducer";
import { user } from "./user/reducer";
import { watchList } from "./watchList/reducer";

export default combineReducers({
  user,
  media,
  watchList
});
