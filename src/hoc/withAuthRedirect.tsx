import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";
let mapStateToPropsForRedirect = (state:AppStateType) => ({
    auth: state.auth.isAuth
}as MapPropsType);
type MapPropsType = {
    auth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent:React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {auth, ...restProps} = props
        if (!props.auth) return <Redirect to='/login'/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedWithAuthRedirect = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>
    (mapStateToPropsForRedirect, {})(RedirectComponent)
    return ConnectedWithAuthRedirect
}