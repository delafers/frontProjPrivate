import React from 'react'
import {addCommentsActioncreator, onPostChangeActCreator} from "../../../Redux/Main_reducer.js";
import Posts from "./Post";
import {connect} from "react-redux";
import PostsReduxForm from "./Post";


let mapStateToProps = (state) => {
    return{
        Top: state.MainPage.Top,
        BlockPost: state.MainPage.BlockPost
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onPostChang: (comment) => {
            dispatch(onPostChangeActCreator(comment))
        },
        addComments: () => {
            dispatch(addCommentsActioncreator())
        },
    }
}



const PostsContainer = connect(mapStateToProps,mapDispatchToProps)(PostsReduxForm);
export default PostsContainer