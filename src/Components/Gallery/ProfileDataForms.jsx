import React from "react";
import userPhoto from "../../assets/images/User_Avatar.png";
import ProfileStatusHook from "./ProfileStatusHook";
import s from "./Gallery.module.css";
import {createField} from "../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";

const ProfileDataForm = ({profile,isOwner,handleSubmit,savePhoto, error }) => {

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
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
                <b>Full name</b>: {createField("Full name", "fullName", [], "input")}
            </div>
            <div className={s.title}>
                <b>Looking for job </b>
                {createField("", "LookingForAJob", [], "input", {type:"checkbox"})}
            </div>
            <div>

                <div className={s.title}>
                    <b>
                        My skills:
                    </b>
                    {createField("My professional skills", "lookingForAJobDescription", [], "textarea")}
                </div>

            </div>
            <div className={s.title}>
                <b>About me </b>
                {createField("About me", "aboutMe", [], "textarea")}
            </div>
            <ProfileStatusHook status={"Hello"}/>
            <div className={s.title}>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(
                key =>{
                    return <div className={s.title} key={key}>
                            <b>
                                {key}
                            </b>
                        {createField(key, "contacts."+ key, [], "input")}
                    </div>
                }
            )}
            </div>
        </form>
    )
}
const ProfileDataFormField = reduxForm({form:"edit-Profile"})(ProfileDataForm)

export default ProfileDataFormField