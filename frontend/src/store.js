import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer,productDetailsReducer} from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const Reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer
}); 

let initialState ={};
const middleware = [thunk];
const store = createStore(Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;