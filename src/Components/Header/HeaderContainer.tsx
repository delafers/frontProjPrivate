import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuthData, logout} from "../../Redux/auth_reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    isAuth:boolean;
    login:null | string
}

type MapDispatchPropsType = {
    logout: () => void
}

class HeaderContain extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    render() {
        // @ts-ignore
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
        );
    }
}
const mapStateToProps= (state:AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,{logout})(HeaderContain)
