import React from 'react'
import s from './Post.module.css'


const Post = (props) => {

    return   (

        <div className={s.post}>
            <div className={s.prof}>
            {props.name}
            <img  src='https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg'/>
            </div>
            <p>
                {props.text}
                A почему бы на главной странице не высрать свой важный текст???
            </p>
            <p>
                 <img src={props.sr}/>
            </p>
            <p>
                <textarea></textarea>
                <button>comment</button>
            </p>
        </div>

    )
}
const Posts = (props) => {

    let PostsElements = props.Top.map( post => <Post name={post.name} sr={post.sr} text={post.text}/>);
    let NewComment = React.createRef();



    let onPostChange = () => {
        let comment = NewComment.current.value;
        props.onPostChang(comment);
    }

    let onAddComments = () => {
        props.addComments();
    }
    return(
        <div >
            <p>
                <textarea ref={NewComment} onChange={onPostChange} value={props.BlockPost}></textarea>
                <button onClick={ onAddComments }>send comment</button>
            </p>
            {PostsElements}
        </div>
    )
}

export default Posts