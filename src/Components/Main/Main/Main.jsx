import React from 'react';
import s from './Main.module.css';
import PostsContainer from "../Post/PostContainer";

const Main = (props) => {
    return (
        <div className={s.content}>
            Здесь мог располагаться ваш текст
            <PostsContainer  />
        </div>

    )
}

export default Main