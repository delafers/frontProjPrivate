import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "./Gallery.module.css";
import {useDispatch} from "react-redux";
type propsType = {
    status:string
}

const ProfileStatusHook: React.FC<propsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    const dispatch = useDispatch()
    const setUserStatus = (status:string) => { dispatch(setUserStatus(status))}

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const  ActivateMode = () => {
        setEditMode(true)
    }
    const  DeactivateMode = () => {
        //props.setUserStatus(status)
        setEditMode(false)
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
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