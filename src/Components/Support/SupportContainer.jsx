import React from 'react';
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPage, setTotalUsersCount,
    toggleFollowingProgress,
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



class ChatContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }


    onPageChanged = (pageNumber) => {
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

/*let mapStateToProps =(state) =>{
    return {
        users: state.SupportPage.users,
        pageSize: state.SupportPage.pageSize,
        totalUsersCount: state.SupportPage.totalUsersCount,
        currentPage: state.SupportPage.currentPage,
        isFetching: state.SupportPage.isFetching,
        followingInProgress: state.SupportPage.followingInProgress
    }
}*/
let mapStateToProps =(state) =>{
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
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, setTotalUsersCount,
        toggleFollowingProgress, getUsers: requestUsers})
)(ChatContainer)