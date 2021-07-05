import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/auth_reducer";
import {Redirect} from "react-router-dom";

const LoginForm = ({handleSubmit}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} component={'input'} type={"password"}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={'input'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({isAuth, login}) => {
    const onSubmit = (formData) => {
        debugger
        console.log(formData)
        login(formData.login, formData.password, formData.rememberMe)
    }
    if(isAuth) {
        return <Redirect to={'/gallery'}/>
    }
    return<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {login}) (Login)