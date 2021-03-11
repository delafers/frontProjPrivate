import React from 'react';
import {connect} from "react-redux";
import {
    follow, getUsers,
    setCurrentPage, setTotalUsersCount,
    toggleFollowingProgress,
    unfollow
} from "../../Redux/support_reducer";
import Chat from "./SupportAPIContainer";
import Preloader from "../common/Preloader/preloader";
import {usersAPI} from "../../api/api";



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

let mapStateToProps =(state) =>{
    return {
        users: state.SupportPage.users,
        pageSize: state.SupportPage.pageSize,
        totalUsersCount: state.SupportPage.totalUsersCount,
        currentPage: state.SupportPage.currentPage,
        isFetching: state.SupportPage.isFetching,
        followingInProgress: state.SupportPage.followingInProgress
    }
}
const SupportContainer = connect(mapStateToProps, {follow, unfollow, setCurrentPage, setTotalUsersCount,
                                                    toggleFollowingProgress, getUsers})(ChatContainer)
export default SupportContainer
