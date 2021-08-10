import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/auth_reducer";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import s from "./Login.module.css"
const maxLength25 = maxLengthCreator(25)

const LoginForm = ({handleSubmit, captchaUrl, error}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                {createField("Login",'login',[required, maxLength25],Input)}
            </div>
            <div>
                {createField("Password",'password',[required, maxLength25],Input, "password")}
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={'input'}/> remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image","captcha", [], "input")}
            { error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({isAuth, login, captchaUrl}) => {
    const onSubmit = (formData) => {
        debugger
        login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }
    if(isAuth) {
        return <Redirect to={'/gallery'}/>
    }
    return<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    captchaUrl:state.auth.captchaUrl
})
export default connect(mapStateToProps, {login}) (Login)