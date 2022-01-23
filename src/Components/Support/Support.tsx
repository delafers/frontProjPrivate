import React, {useEffect, useState} from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./OneUser";
import {UserType} from "../../types/types";
import UsersSearchForm from './UsersSearchForm';
import {FilterType, follow, unfollow, requestUsers} from "../../Redux/support_reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getUsersCount,
    getUsersFilter,
    getUsersSuper
} from "../../Redux/user_selectors";

type PropsType = {
    }

export const Chat: React.FC<PropsType> = (props) => {
    const followingInProgress = useSelector(getFollowingInProgress)
    const users = useSelector(getUsersSuper)
    const totalUsersCount = useSelector(getUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))

    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const  onFilterChanged = (filter:FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = (userId:number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId:number) => {
        dispatch(unfollow(userId))
    }
    return <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
        </div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User key={u.id} user={u}
                                     followingInProgress={followingInProgress} unfollow={unfollow}
                                     follow={follow}/>)

            }
        </div>
    </div>
}
