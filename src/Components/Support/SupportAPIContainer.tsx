import React, {useState} from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./OneUser";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    portionSize?: number,
    users: Array<UserType>,
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Chat:React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount,pageSize,followingInProgress,users,unfollow,follow,...props}) => {

    return <div>
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

export default Chat