import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../Redux/auth_reducer";
import {Redirect} from "react-router-dom";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import s from "./Login.module.css"
import {AppStateType} from "../../Redux/redux-store";
const maxLength25 = maxLengthCreator(25)

type OwnProps = {
    captchaUrl:string | null
}
const LoginForm:React.FC<InjectedFormProps<LoginFormTypes, OwnProps> & OwnProps> = ({handleSubmit, captchaUrl, error}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                {createField("Login","login", [required, maxLength25],Input)}
            </div>
            <div>
                {createField("Password",'password',[required, maxLength25],Input, "password")}
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={'input'}/> remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image","captcha", [], Input)}
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormTypes, OwnProps>({form: 'login'})(LoginForm)


type mapStateToPropsType = {
    //captchaUrl:string | null,
    isAuth:boolean
}
type mapDispatchPropsType = {
    login:(email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type LoginFormTypes = {
    login:string,
    password: string,
    rememberMe: boolean,
    captcha: string
}
export type LoginFormTypesKeys = GetStringKeys<LoginFormTypes>


export const LoginPage = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData:LoginFormTypes) => {
        dispatch(login(formData.login, formData.password, formData.rememberMe, formData.captcha))
    }
    if(isAuth) {
        return <Redirect to={'/gallery'}/>
    }
    return<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

