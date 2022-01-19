import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from "react-router-dom";

const Nav = () => {
    return(
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/' activeClassName={s.active}>Main</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packs' activeClassName={s.active}>Packs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/gallery' activeClassName={s.active}>Gallery</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Login' activeClassName={s.active}>Login</NavLink>
            </div>
        </nav>
    )
}

export default Nav