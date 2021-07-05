import React from 'react';
import s from './Gallery.module.css'
import Preloader from "../common/Preloader/preloader";
import {Redirect} from "react-router-dom";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusHook from "./ProfileStatusHook";

const maxLength25 = maxLengthCreator(25)

const Gallery = (props) => {
    let GalleryImg = props.GalleryPage.GalleryAccounts.map(p => <GalleryPost class={p.class} sr={p.name}/>)
    let NewPicture = React.createRef();

    let onGalChange = () => {
        let comment = NewPicture.current.value;
        props.updateImgURL(comment);
    }
    let addPicture = () => {
        props.addPicture();
    }
    if (!props.profile) {
        return <Preloader />
    }
    return(
        <div className={s.columngal}>
            <div>
                {props.profile.aboutMe}
            </div>
            <div>
                {props.profile.lookingForAJobDescription}
            </div>
            <div>
               <img src={props.profile.photos.small}/>
               <img src={props.profile.photos.small}/>
               <img src={props.profile.photos.small}/>
            </div>
            <ProfileStatusHook status={"Hello"}/>
            <p>
                <textarea ref={NewPicture}
                          onChange={onGalChange}
                          value={props.BlockPost}
                            validata={[required,maxLength25]}>choose picture</textarea>
                <button onClick={addPicture} >add</button>
            </p>
            {GalleryImg}
        </div>
    )
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