import {combineReducers} from 'redux';

import resCorrecReducer from './resCorrecta/resCorrec.reducer';

export default combineReducers({
    resCorrecta : resCorrecReducer
});