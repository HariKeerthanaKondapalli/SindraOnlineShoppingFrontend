import {combineReducers} from 'redux';

//importing all other related reducers
import customerReducer from './customerReducer';
import redirect from './redirect';
import itemsReducer from './itemsReducer';

//Combining all reducers to root reducer using combinedReducers
const rootReducer = combineReducers({
    customerReducer: customerReducer,
    redirect: redirect,
    itemsReducer: itemsReducer,    
});

// exporting the root reducer
export default rootReducer;