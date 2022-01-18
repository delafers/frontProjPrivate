import React from 'react'
import s from './Post.module.css'
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {InitialStateType, Top} from "../../../Redux/Main_reducer";
import {LoginFormTypes} from "../../Login/Login";

const maxLength25 = maxLengthCreator(25)
type ownProps = {
    postsPage: InitialStateType,
    Top: Top,
    onPostChang: (comment:string) => void,
    addComments: (post:string) => void,
    BlockPost: string,
    handleSubmit:LoginFormTypes
}
type OnePostValues= {
    name:string,
    sr: string,
    text: string
}
export type PostFormTypes = {
    post:string,
}
export type PostFormTypesKeys = Extract<keyof PostFormTypes, string>

const Post: React.FC<OnePostValues> = (props) => {
    return   (
        <div className={s.post}>
            <div className={s.prof}>
            {props.name}
            <img  src='https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg'/>
            </div>
            <p>
                {props.text}
                A почему бы на главной странице не оставить свой важный текст???
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

const Posts:React.FC<InjectedFormProps<LoginFormTypes, ownProps> & ownProps> = ({Top, onPostChang, addComments,BlockPost, handleSubmit })=> {
    let PostsElements = Top.map(post => <Post name={post.name} sr={post.sr} text={post.text}/>);
    let NewComment = React.createRef();


    let onPostChange = () => {
        // @ts-ignore
        let comment = NewComment.current.value;
        onPostChang(comment);
    }

    let onAddComments = (formData:PostFormTypes) => {
        addComments(formData.post);
    }
    return (
        <div>
            <p>
                <form onSubmit={handleSubmit}>
                    <Field component={Textarea}  name={'post'} placeholder={"Text for post"} validata={[required, maxLength25]}/>
                    <button>send comment</button>
                </form>
            </p>
            {PostsElements}
        </div>
    )
};
const PostsReduxForm = reduxForm<LoginFormTypes, ownProps>({form: 'mainPost'})(Posts)
export default PostsReduxForm