import React, {ChangeEvent} from "react";
import userPhoto from "../../assets/images/User_Avatar.png";
import ProfileStatusHook from "./ProfileStatusHook";
import s from "./Gallery.module.css";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../types/types";

type PropsForm = {
    profile:ProfileType,
    isOwner: boolean,
    handleSubmit?: () => void,
    savePhoto: (file:File) => void,
    error?: string | null
    initialValues?: ProfileType
}
type OwnProps = {

}
type ProfileDataFormType = {
    fullName: string,
    LookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string
}
type KeysOfProfileData = Extract<keyof ProfileDataFormType, string>

debugger

const ProfileDataForm:React.FC<InjectedFormProps<ProfileDataFormType, PropsForm> & PropsForm> = (
    {profile,isOwner,handleSubmit,savePhoto,
        error }) => {

    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            savePhoto(e.target.files[0])
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <div><button>Save changes</button></div>
            {error && <div>
                {error}
            </div>}
            <div>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div className={s.title}>
                <b>Full name</b>: {createField<KeysOfProfileData>("Full name", "fullName", [], Input)}
            </div>
            <div className={s.title}>
                <b>Looking for job </b>
                {createField<KeysOfProfileData>("", "LookingForAJob", [], Input, {type:"checkbox"})}
            </div>
            <div>

                <div className={s.title}>
                    <b>
                        My skills:
                    </b>
                    {createField<KeysOfProfileData>("My professional skills", "lookingForAJobDescription", [], Textarea)}
                </div>

            </div>
            <div className={s.title}>
                <b>About me </b>
                {createField<KeysOfProfileData>("About me", "aboutMe", [], Textarea)}
            </div>
            <div className={s.title}>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(
                key =>{
                    return <div className={s.title} key={key}>
                            <b>
                                {key}
                            </b>
                        {createField(key, "contacts."+ key, [], Input)}
                    </div>
                }
            )}
            </div>
        </form>
    )
}
const ProfileDataFormField = reduxForm<ProfileType, PropsForm>({form:"edit-Profile"})(ProfileDataForm)

export default ProfileDataFormField