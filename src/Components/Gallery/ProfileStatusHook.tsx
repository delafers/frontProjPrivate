import React, {ChangeEvent, useEffect, useState} from 'react'
import s from "./Gallery.module.css";
type propsType = {
    status:string
    setUserStatus?: (status: string) => void
}

const ProfileStatusHook: React.FC<propsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    debugger
    useEffect(() => {
        setStatus(props.status)
        debugger
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