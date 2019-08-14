import { combineReducers } from 'redux';
import { search } from './search/reducer';
import { user } from './user/reducer';
import { watchList } from './watchList/reducer';

export default combineReducers({
	user,
	search,
    watchList
});