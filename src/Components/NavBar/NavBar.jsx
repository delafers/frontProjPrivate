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
                <NavLink to='/main' activeClassName={s.active}>Main</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/packs' activeClassName={s.active}>Packs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/support' activeClassName={s.active}>support(Test)</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/gallery' activeClassName={s.active}>Gallery</NavLink>
            </div>
        </nav>
    )
}

export default Nav