import React, {ChangeEvent, useState} from 'react';
import s from './Gallery.module.css'
import Preloader from "../common/Preloader/preloader";
import {Redirect, useHistory} from "react-router-dom";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import ProfileStatusHook from "./ProfileStatusHook";
import userPhoto from "../../assets/images/User_Avatar.png"
import ProfileDataFormField from "./ProfileDataForms";
import {actions, setUserStatus, saveProfile, savePhoto} from "../../Redux/Galerey_reducer";
import {ContactsType, ProfileType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import queryString from "querystring";

const maxLength25 = maxLengthCreator(25)
type GalleryPropsType = {

}
const Gallery:React.FC<GalleryPropsType> = (props) => {

    const GalleryPage = useSelector((state: AppStateType) => state.GalleryPage.GalleryAccounts  )
    const BlockPost = useSelector((state: AppStateType) => state.GalleryPage.BlockPost)
    const profile = useSelector((state: AppStateType) => state.GalleryPage.profile)
    const status = useSelector((state: AppStateType) => state.GalleryPage.status)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    //if()

    const dispatch = useDispatch()
    const updateImgURL = (comment: string) => { dispatch(actions.OnSrcPostChange(comment))}
    const addPicture = () => { dispatch(actions.AddImgToGallery())}
    const saveProfileA = (formData: ProfileType) => { dispatch(saveProfile(formData))}
    const setUserStatusH = (status:string) => { dispatch(setUserStatus(status))}
    const savePhotoH = (file:File) => {dispatch(savePhoto(file))}
    const history = useHistory()
    const parsed = history.location.pathname.split("/")[2]
    // @ts-ignore
    let isOwner = parsed == authorizedUserId ? true : false
    let [editMode, setEditMode] = useState(false)
    let GalleryImg = GalleryPage.map(p => <GalleryPost class={p.class} sr={p.name}/>)
    let NewPicture = React.createRef();

    let onGalChange = () => {
        // @ts-ignore
        let comment = NewPicture.current.value;
        updateImgURL(comment);
    }
    if (!profile) {
        return <Preloader />
    }

    const onSubmit = (formData:ProfileType) => {
        // @ts-ignore
        saveProfileA(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return(
        <div className={s.columngal}>
            <div>
                {editMode ? <ProfileDataFormField  savePhoto={savePhotoH} isOwner={isOwner} onSubmit={onSubmit} /> :
                    <ProfileData goToEditMode={() => {setEditMode(true)}} savePhoto={savePhotoH} isOwner={isOwner}/>}
            </div>
            <div>
                <textarea >choose picture</textarea>
                <button onClick={() => {addPicture()}} >add</button>
            </div>
            {GalleryImg}
        </div>
    )
}
type ProfileDataProps = {
    savePhoto: (file: File) => void,
    isOwner: boolean,
    goToEditMode: () => void
}
const ProfileData:React.FC<ProfileDataProps> = (props) => {
    const profile = useSelector((state: AppStateType) => state.GalleryPage.profile)
    const dispatch = useDispatch()

    const setUserStatusH = (status:string) => { dispatch(setUserStatus(status))}

    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            props.savePhoto(e.target.files[0])
        }
    }
    debugger
    return(
        <div className={s.columngal}>
            {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
            <div>
                <img src={profile?.photos.large || userPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div className={s.title}>
                <b>Full name</b>: {profile?.fullName}
            </div>
            <div className={s.title}>
                <b>Looking for job </b>: {profile?.lookingForAJob ? "yes" : "no"}
            </div>
            <div>
                {profile?.lookingForAJob &&
                <div className={s.title}>
                    <b>
                        My skills:
                    </b>
                    {profile?.lookingForAJobDescription}
                </div>
                }
            </div>
            <div className={s.title}>
                <b>About me </b>: {profile?.aboutMe}
            </div>
            <ProfileStatusHook  status={"Hello"}/>
            <div className={s.title}>
                <b>Contacts</b>: { profile && Object.keys(profile?.contacts).map(
                key =>{
                    return <Contacts contactTitle={key} key={key}
                                     contactValue={profile.contacts[key as keyof ContactsType]}/>
                }
            )}
            </div>
        </div>
    )

}

type Contacts = {
    contactTitle: string,
    contactValue: string
}
const Contacts:React.FC<Contacts> = ({contactTitle,contactValue}) => {
    return<div className={s.title}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}
type GalleryPostProps = {
    sr:string
    class: string
}
const GalleryPost:React.FC<GalleryPostProps> = (props) => {
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