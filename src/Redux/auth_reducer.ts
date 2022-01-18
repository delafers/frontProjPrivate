import { Action } from "redux";
import {FormAction, stopSubmit} from "redux-form";
import {securityAPI} from "../api/api";
import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/authAPI";
import {BaseThunkType, InferActionTypes} from "./redux-store";


export type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    username: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    username: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case '/security/get-captcha-url':
            return {...state, captchaUrl: action.payload}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload:{userId, email, login, isAuth}} as const),
    setCaptcha: (captchaUrl: string) => ({type: '/security/get-captcha-url', payload: captchaUrl } as const)
}



export const getUserAuthData = ():ThunkTypes => async (dispatch) => {
    let meData = await authAPI.me()
        if (meData.resultCode === ResultCodesEnum.Success){
            let {id, email, login} = meData.data;
            dispatch(actions.setAuthUserData(id , email, login, true ))
        }
}
export const getCaptcha = ():ThunkTypes => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.url
    dispatch(actions.setCaptcha(captchaUrl))
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkTypes => async (dispatch: any) => {

    let loginData = await authAPI.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodesEnum.Success){
            dispatch(getUserAuthData())
        } else if(loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptcha())
        } else {
            const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }

}
export const logout = ():ThunkTypes => async (dispatch) => {
   let response = await authAPI.logout()
        if (response.data.resultCode === 0){
            dispatch(actions.setAuthUserData(null , null, null, false ))
        }
}


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkTypes = BaseThunkType<ActionsTypes | FormAction>

export default authReducer