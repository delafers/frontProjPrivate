import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import mainReducer from "./Main_reducer";
import GalleryReducer from "./Galerey_reducer";
import packsReducer from "./Packs_reducer";
import supportReducer from "./support_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app_reducer";

let reducers = combineReducers({
    MainPage: mainReducer,
    GalleryPage: GalleryReducer,
    Packs:packsReducer,
    SupportPage: supportReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
    }
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store