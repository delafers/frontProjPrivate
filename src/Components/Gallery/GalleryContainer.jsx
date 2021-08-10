import React from 'react';
import {AddImgToGallery, OnSrcPostChange, getUserProfile, savePhoto, saveProfile} from "../../Redux/Galerey_reducer.js";
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class galleryContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <>
            <Gallery GalleryPage={this.props.GalleryPage} BlockPost={this.props.BlockPost}
                     profile={this.props.GalleryPage.profile} {...this.props} auth={this.props.auth}
                     isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile} isAuth={this.props.isAuth}
                     updateImgURL={OnSrcPostChange} addPicture={AddImgToGallery}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        GalleryPage: state.GalleryPage,
        BlockPost: state.GalleryPage.BlockPost,
        profile: state.GalleryPage.profile,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}


export default compose(
    connect(mapStateToProps, {getUserProfile, OnSrcPostChange, AddImgToGallery, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(galleryContainer)