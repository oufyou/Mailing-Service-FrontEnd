import {combineReducers} from 'redux';
import mailDTOs from './mailDTOs.reducer';
import producerRTs from './producerRTs.reducer';
import user from './user.reducer';

const reducer = combineReducers({
    mailDTOs,
    producerRTs,
    user
});

export default reducer;
