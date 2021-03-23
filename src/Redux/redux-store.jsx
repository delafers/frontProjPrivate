import {applyMiddleware, combineReducers, createStore} from "redux";
import mainReducer from "./Main_reducer";
import GalleryReducer from "./Galerey_reducer";
import packsReducer from "./Packs_reducer";
import supportReducer from "./support_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    MainPage: mainReducer,
    GalleryPage: GalleryReducer,
    Packs:packsReducer,
    SupportPage: supportReducer,
    auth: authReducer,
    form: formReducer
    }
);

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store