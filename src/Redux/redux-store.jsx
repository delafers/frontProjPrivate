import {applyMiddleware, combineReducers, createStore} from "redux";
import mainReducer from "./Main_reducer";
import GalleryReducer from "./Galerey_reducer";
import packsReducer from "./Packs_reducer";
import supportReducer from "./support_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    MainPage: mainReducer,
    GalleryPage: GalleryReducer,
    Packs:packsReducer,
    SupportPage: supportReducer,
    auth: authReducer
    }
);

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store