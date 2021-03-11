import React, {useState} from 'react'
import s from './Support.module.css'
import userImg from '../../assets/images/User_Avatar.png'
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {usersAPI} from "../../api/api";

let Chat = (props) => {

    const [] = useState(false)
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        {pages.push(i)}
       if(i > 10) {
           {pages.push(pagesCount)}
           break
       }
    }


    return <div className={s.user}>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.activePage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}</span>
            })}

        </div>
        {
            props.users.map(u => <div key={u.id}>
                <NavLink to={'/gallery/' + u.id}>
                <div>
                    <img src={u.photos.small != null ? u.photos.small : userImg} className={s.userimg}/>
                    {u.name}
                </div>
                </NavLink>
                <div>
                    {u.followed
                        ? <button className={s.userbuttonD} disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => {props.unfollow(u.id)}}>
                            Unfollow</button>
                        : <button className={s.userbuttonA} disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => {props.follow(u.id)}}>
                            Follow</button>}
                </div>
            </div>)
        }
    </div>

}


export default Chat