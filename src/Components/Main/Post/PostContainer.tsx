import React from 'react'
import {actions, Top} from "../../../Redux/Main_reducer";
import {connect} from "react-redux";
import PostsReduxForm from "./Post";
import {AppStateType} from "../../../Redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return{
        Top: state.MainPage.Top,
        BlockPost: state.MainPage.BlockPost
    }
}
type mapPropsType = {
    Top: Top,
    BlockPost: string
}


// @ts-ignore
const PostsContainer = connect(mapStateToProps, {...actions})(PostsReduxForm)
export default PostsContainer