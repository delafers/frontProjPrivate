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
    profile: ProfileType | null,
    authorizedUserId:number | null,
    isAuth:boolean ,
    status: string | null,
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
        let userId:number = +this.props.match.params.userId;
        if (!userId) {
            // @ts-ignore
            userId = this.props.authorizedUserId;
        }
        debugger
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
                <button onClick={() => {this.props.setUserStatus()}}>{this.props.profile?.aboutMe}</button>
            </div>

        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        GalleryPage: state.GalleryPage.GalleryAccounts,
        BlockPost: state.GalleryPage.BlockPost,
        profile: state.GalleryPage.profile,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        status: state.GalleryPage.status
    }
}


// @ts-ignore
export default compose(
    connect(mapStateToProps, { addPicture: actions.AddImgToGallery, getUserStatus,
        setUserProfile: actions.setUserProfile, setStatus:actions.setStatus, setUserStatus,
        getUserProfile, savePhoto}),
    withRouter, withAuthRedirect
)(galleryContainer)as React.ComponentType