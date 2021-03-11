import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
            <header className={s.header}>
                <a>
                    <img src='https://pngimg.com/uploads/photoshop/photoshop_PNG11.png' />
                </a>
                {props.isAuth ? props.login
                    : <NavLink to='/profile' className={s.header}>Profile</NavLink>}
            </header>
    );
}
export default Header