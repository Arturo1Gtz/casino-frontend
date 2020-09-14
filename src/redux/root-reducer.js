import {combineReducers} from 'redux';

import resCorrecReducer from './resCorrecta/resCorrec.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    resCorrecta : resCorrecReducer,
    user: userReducer
});