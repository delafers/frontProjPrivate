import preloader from "../../../assets/images/preloader.svg";
import s from './preloader.module.css'
import React from 'react'
const  Preloader = (props) => {
    return <div className={s.preloader}>
        <img src={preloader}/>
    </div>
}

export default Preloader