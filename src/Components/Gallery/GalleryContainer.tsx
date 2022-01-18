import React from 'react';
import {
    actions,
    ActionsType,
    getUserProfile,
    getUserStatus,
    savePhoto,
    setUserStatus
} from "../../Redux/Galerey_reducer"
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStateProps = {
    GalleryPage: any,
    BlockPost: string,
    profile: ProfileType,
    authorizedUserId:number ,
    isAuth:boolean ,
    status: string,
    actions: ActionsType

}
type DispatchPropsType = {
    AddImgToGallery: (file:File) => void
    OnSrcPostChange: () => void
    savePhotoSuccess: () => void
    savePhoto: () => void
    setStatus: () => void
    setUserStatus: () => void
    getUserStatus: () => void
    updateImgURL: (comment: string) => void
    saveProfile:(profile:ProfileType) => Promise<any>
    addPicture:() => void
    getUserProfile:(userId: number) => void
}
type routeProps = {
    userId: string
}
export class galleryContainer extends React.Component<MapStateProps & DispatchPropsType  & RouteComponentProps<routeProps>> {
    refreshProfile() {
        debugger
        let userId:number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId)
    }

    componentDidMount() {
    debugger
        this.refreshProfile();
        this.props.setUserStatus()
    }

    render() {
        return<>
            <div>
                fdg
            </div>
            <Gallery GalleryPage={this.props.GalleryPage} BlockPost={this.props.BlockPost}
                     updateImgURL={this.props.updateImgURL} getUserStatus={this.props.getUserStatus}
                     setUserStatus={this.props.setUserStatus}  profile={this.props.GalleryPage.profile}
                     isOwner={!this.props.match.params.userId} saveProfile={this.props.saveProfile}
                     addPicture={this.props.addPicture}  savePhoto={this.props.savePhoto}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    debugger
    return {
        GalleryPage: state.GalleryPage.GalleryAccounts,
        BlockPost: state.GalleryPage.BlockPost,
        profile: state.GalleryPage.profile,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        status: state.GalleryPage.status
    }
}


let a = compose(
    connect(mapStateToProps, { addPicture: actions.AddImgToGallery, getUserStatus,
        setUserProfile: actions.setUserProfile, setStatus:actions.setStatus, setUserStatus,
        getUserProfile, savePhoto}),
    withRouter
)(galleryContainer)