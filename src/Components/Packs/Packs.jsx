import React from 'react'
import s from './Packs.module.css'
import OnePack from "./OneTypePack/OneTypePack";

const Packs = (props) => {
    return(
        <div>
            <div >
                <a>
                    writeln
                </a>
            </div>
            <p>
                <OnePack Pack={props.Pack}/>
            </p>
        </div>
    )
}

export default Packs