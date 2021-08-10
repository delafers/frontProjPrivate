import React, {useState} from 'react'
import s from './Support.module.css'
import userImg from '../../assets/images/User_Avatar.png'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let User = ({user, followingInProgress,unfollow,follow }) => {

    return <div className={s.user}>
           <div >
               <NavLink to={'/gallery/' + user.id}>
                <div>
                    <img src={user.photos.small != null ? user.photos.small : userImg} className={s.userimg}/>
                    {user.name}
                </div>
                </NavLink>
                <div>
                    {user.followed
                        ? <button className={s.userbuttonD} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {unfollow(user.id)}}>
                            Unfollow</button>
                        : <button className={s.userbuttonA} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {follow(user.id)}}>
                            Follow</button>}
                </div>
            </div>

    </div>

}


export default User