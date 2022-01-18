import React from 'react';
import {connect} from "react-redux";
import {
    follow, requestUsers,
    unfollow
} from "../../Redux/support_reducer";
import Chat from "./SupportAPIContainer";
import Preloader from "../common/Preloader/preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getUsers,
    getUsersCount, getUsersSuper
} from "../../Redux/user_selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type OwnPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class ChatContainer extends React.Component<PropsType> {
    componentDidMount() {
        debugger
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
      this.props.getUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Chat totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     users={this.props.users}
                     unfollow={this.props.unfollow}
                     follow={this.props.follow}
                     followingInProgress={this.props.followingInProgress}
                    />
        </>
    }
}
const mapStateToProps =(state: AppStateType):MapStatePropsType =>{
    debugger
    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
const SupportContainer = (ChatContainer)
export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {follow, unfollow, getUsers: requestUsers})
)(ChatContainer) as React.ComponentType