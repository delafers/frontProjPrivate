import React, {useState} from 'react'

import Paginator from "../common/Paginator/Paginator";
import User from "./OneUser";

let Chat = ({currentPage,onPageChanged, totalUsersCount,pageSize,followingInProgress,users,unfollow,follow,...props}) => {

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