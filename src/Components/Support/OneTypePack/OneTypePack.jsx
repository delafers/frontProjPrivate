import React from 'react'
import s from './OneTypePack.module.css'

const Packis = (props) => {
    return(
        <div className={s.pack}>
            <p>
                {props.name}
                <a href=''>
                    {props.link}
                </a>
            </p>
        </div>
    )
}
const OnePack = (props) => {
    let PackModule =
        props.Pack.map(p => <Packis name={p.name} link={p.linkdisk}/>)
       return(
        <div>
            {PackModule}
        </div>
    )
}

export default OnePack