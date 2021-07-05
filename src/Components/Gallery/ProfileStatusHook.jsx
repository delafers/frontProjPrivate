import React, {useEffect, useState} from 'react'

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
            <div>
                <span onDoubleClick={ActivateMode}>{status}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onChange={onStatusChange}
                       onBlur={DeactivateMode} value={status}/>
            </div>
            }
        </div>
    )
}


export default ProfileStatusHook