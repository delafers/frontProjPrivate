import {instance} from "./api";
import {APIResponseType} from "./api"

export type MeResponseDataType = {
        id: number,
        email:string,
        login:string
}
export type LoginResponseDataType = {
        userId:number
}
export enum ResultCodesEnum {
    Success= 0,
    Error= 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}



export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email:string, password:string, rememberMe = false, captcha:null| string = null) {
        return instance.post<APIResponseType<LoginResponseDataType,ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha}).then(res =>
        res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}