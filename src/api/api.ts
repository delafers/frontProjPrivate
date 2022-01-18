import axios from "axios";
import {UserType} from "../types/types";
import {ResultCodesEnum} from "./authAPI";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "56245fdd-e3d2-46ed-807c-f34ef5d03262"}
});

export type APIResponseType<D = {}, RC = ResultCodesEnum > = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get<CaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}

type CaptchaUrlResponseType = {
    url:string
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}