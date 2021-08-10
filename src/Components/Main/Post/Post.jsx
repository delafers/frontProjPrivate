import React from 'react'
import s from './Post.module.css'
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength25 = maxLengthCreator(25)

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
            <form>
            <p>

                <button>comment</button>
            </p>
            </form>
        </div>

    )
}

const Posts = ({Top, onPostChang, addComments,BlockPost, handleSubmit })=> {
    let PostsElements = Top.map(post => <Post name={post.name} sr={post.sr} text={post.text}/>);
    let NewComment = React.createRef();


    let onPostChange = () => {
        let comment = NewComment.current.value;
        onPostChang(comment);
    }

    let onAddComments = (formData) => {
        addComments(formData.post);
    }
    return (
        <div>
            <p>
                <form onAddComments={handleSubmit}>
                    <Field component={Textarea}  name={'post'} placeholder={"Text for post"} validata={[required, maxLength25]}/>
                    <button >send comment</button>
                </form>
            </p>
            {PostsElements}
        </div>
    )
};
const PostsReduxForm = reduxForm({form: 'mainPost'})(Posts)
export default PostsReduxForm