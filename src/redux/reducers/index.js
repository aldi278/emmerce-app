import { combineReducers } from "redux";
import userReducers from './user';
import cartReducers from './cart'
export default combineReducers({
    user : userReducers,
    cart : cartReducers
})