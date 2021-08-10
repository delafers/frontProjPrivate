import {authAPI, securityAPI} from "../api/api";
import  {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = '/security/get-captcha-url'

let initialState = {
    userId: null,
    email: null,
    username: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.payload}
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload:{userId, email, login, isAuth}})
export const setCaptcha = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS,payload: captchaUrl })

export const getUserAuthData = () => async (dispatch) => {
    let response = await authAPI.me()
        if (response.data.resultCode === 0){
            debugger
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id , email, login, true ))
        };
}
export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptcha(captchaUrl))
}
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0){
            dispatch(getUserAuthData())
        } else if(response.data.resultCode === 10){
            dispatch(getCaptcha())
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }

}
export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null , null, null, false ))
        }
}


export default authReducer