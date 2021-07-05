import {authAPI} from "../api/api";
import  {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: null,
    email: null,
    username: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload:{userId, email, login, isAuth}})

export const getUserAuthData = () => async (dispatch) => {
    let response = await authAPI.me()

        if (response.data.resultCode === 0){
            debugger
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id , email, login, true ))
        };
}
export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)

        if (response.data.resultCode === 0){
            dispatch(getUserAuthData())
        }

}
export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null , null, null, false ))
        }
}


export default authReducer