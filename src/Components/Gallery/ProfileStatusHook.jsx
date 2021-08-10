import React, {useEffect, useState} from 'react'
import s from "./Gallery.module.css";

const ProfileStatusHook = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const  ActivateMode = () => {
        debugger
        setEditMode(true)
    }
    const  DeactivateMode = () => {
        setEditMode(false)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            { !editMode &&
            <div className={s.title}>
                <b>Status: </b>
                <span onDoubleClick={ActivateMode}>{status}</span>
            </div>
            }
            {editMode &&
            <div className={s.title}>
                <b>Status: </b>
                <input autoFocus={true} onChange={onStatusChange}
                       onBlur={DeactivateMode} value={status}/>
            </div>
            }
        </div>
    )
}


export default ProfileStatusHook