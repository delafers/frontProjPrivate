import React, {ChangeEvent, useState} from 'react';
import s from './Gallery.module.css'
import Preloader from "../common/Preloader/preloader";
import {Redirect} from "react-router-dom";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import ProfileStatusHook from "./ProfileStatusHook";
import userPhoto from "../../assets/images/User_Avatar.png"
import ProfileDataFormField from "./ProfileDataForms";
import {setUserStatus} from "../../Redux/Galerey_reducer";
import {ContactsType, ProfileType} from "../../types/types";

const maxLength25 = maxLengthCreator(25)

const Gallery = (props) => {

    let [editMode, setEditMode] = useState(false)
    let GalleryImg = props.GalleryPage.map(p => <GalleryPost class={p.class} sr={p.name}/>)
    let NewPicture = React.createRef();

    let onGalChange = () => {
        // @ts-ignore
        let comment = NewPicture.current.value;
        props.updateImgURL(comment);
    }
    let addPicture = () => {
        props.addPicture();
    }
    if (props.profile) {
        return <Preloader />
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return(
        <div className={s.columngal}>
            <div>
                {editMode ? <ProfileDataFormField  savePhoto={props.savePhoto} profile={props.profile}
                                                   isOwner={props.isOwner} onSubmit={onSubmit} /> :
                    <ProfileData goToEditMode={() => {setEditMode(true)}} savePhoto={props.savePhoto} isOwner={props.isOwner}
                                 profile={props.profile}   setUserStatus={props.setUserStatus} />}
            </div>
            <div>
                <textarea >choose picture</textarea>
                <button onClick={addPicture} >add</button>
            </div>
            {GalleryImg}
        </div>
    )
}

const ProfileData = (props) => {
    const onMainPhotoSelected = (e) => {
        if(e.target.files?.length){
            props.savePhoto(e.target.files[0])
        }
    }
    return(
        <div className={s.columngal}>
            {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
            <div>
                <img src={props.profile.photos.large || userPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div className={s.title}>
                <b>Full name</b>: {props.profile.fullName}
            </div>
            <div className={s.title}>
                <b>Looking for job </b>: {props.profile.lookingForAJob ? "yes" : "no"}
            </div>
            <div>
                {props.profile.lookingForAJob &&
                <div className={s.title}>
                    <b>
                        My skills:
                    </b>
                    {props.profile.lookingForAJobDescription}
                </div>
                }
            </div>
            <div className={s.title}>
                <b>About me </b>: {props.profile.aboutMe}
            </div>
            <ProfileStatusHook setUserStatus={props.setUserStatus} status={"Hello"}/>
            <div className={s.title}>
                <b>Contacts</b>: {Object.keys(props.profile.contacts).map(
                key =>{
                    return <Contacts contactTitle={key} key={key}
                                     contactValue={props.profile?.contacts[key]}/>
                }
            )}
            </div>
        </div>
    )

}


const Contacts= ({contactTitle,contactValue}) => {
    return<div className={s.title}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

const GalleryPost = (props) => {
    return(
        <div className={s.columngal}>
            <div>
                <img src={props.sr} alt='aaaaaaaaaaaa'/>
                <img src='https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg'/>
                <img src='https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg'/>
            </div>
            {props.sr}
        </div>

    )
}
export default Gallery