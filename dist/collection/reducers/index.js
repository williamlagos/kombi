import session from './session';
import customer from './customer';
import merchant from './merchant';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    session,
    customer,
    merchant
});
export default rootReducer;
