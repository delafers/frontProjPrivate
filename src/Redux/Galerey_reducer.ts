import {FormAction, stopSubmit} from "redux-form";
import {GalleryType, PhotosType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profileAPI";
import {usersAPI} from "../api/usersAPI";
import {BaseThunkType, InferActionTypes} from "./redux-store";

const ADD_IMG = 'ADD-IMG'
const CHANGE_PHOTO = 'IMG'
const DELETE_POST = 'ADD-IMG'
const UPDATE_SRC = 'UPDATE-SRC'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'


let initialState = {
    GalleryAccounts: [
        {class: 'Nature', name: 'https://sun9-40.userapi.com/impg/IpcbkULm7LqC4XQYLSG_swLa5cdNXXJ4QDerjQ/kdOHf8W9pUc.jpg?size=1080x754&quality=96&proxy=1&sign=9668b310115895160a96b40a1f0a0ba1&type=album', id: 1},
        {
            class: 'Brains',
            name: 'https://sun9-19.userapi.com/impg/4cJlx83BGHrmc-qVpGH4db0aXKPihIP3w2dleA/sG643_rh_h0.jpg?size=1080x769&quality=96&proxy=1&sign=1b706df2572e01cd8a9ecc31bc900c14&type=album',
            id: 2
        },
        {class: 'Games',
            name: 'https://sun9-9.userapi.com/impg/315dd_uMOkpAmL5X4VwiD_L_9SZRAkZjVrZCPw/g4LPT_10jkw.jpg?size=277x329&quality=96&proxy=1&sign=37cd58191b5cf139cc7e98607d033033&type=album',
            id: 3
        }
    ] as Array<GalleryType>,
    BlockPost: 'send img',
    profile: null as ProfileType | null,
    status: null as string | null
}

export type InitialStateType = typeof initialState
export type ActionsType = InferActionTypes<typeof actions>
type ThunkTypes = BaseThunkType<ActionsType | FormAction>

export const actions = {
    AddImgToGallery: () => ({type: ADD_IMG}as const),
    OnSrcPostChange: (comment: string) => ({type: UPDATE_SRC, imgsrc: comment}as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: CHANGE_PHOTO, photos}as const),
    setStatus: (status: string) => ({type: SET_USER_STATUS, status}as const),
}

const GalleryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_IMG: {
            let newpick = {
                class: 'face',
                name: state.BlockPost,
                id: 5
            };
            let stateCopy = {
                ...state,
                GalleryAccounts: [...state.GalleryAccounts, newpick],
                BlockPost: '',
            };
            return stateCopy;
        }
        case UPDATE_SRC: {
            let stateCopy = {...state};
            stateCopy.BlockPost = action.imgsrc;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            debugger
            return {...state, profile: action.profile}
        }
        /*case DELETE_POST: {
            return {...state, GalleryAccounts: state.GalleryAccounts.filter(p => p.id != action.postId)}
        }*/
        case CHANGE_PHOTO: {
            // @ts-ignore
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

//export const saveProfileSuccess = (photos: any) => ({type: CHANGE_PHOTO, photos})
//export const DeletePost = (postId: number) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId: number):ThunkTypes => async (dispatch) => {
    let response = await usersAPI.galleryProfile(userId)
    debugger
    dispatch(actions.setUserProfile(response.data))
}

export const savePhoto = (file: File):ThunkTypes => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    // @ts-ignore
    dispatch(savePhotoSuccess(response.data.photos))
}

export const saveProfile = (profile: ProfileType):ThunkTypes => async (dispatch, getState) => {
    // @ts-ignore
    const userId:number = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0){
        dispatch(getUserProfile(userId))
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : ""
        dispatch(stopSubmit("edit-Profile", {_error: message}))
    }
}
export const setUserStatus = (status = ""):ThunkTypes => async (dispatch, getState) => {
    // @ts-ignore
    const userId:number = getState().auth.userId
    let response = await profileAPI.updateStatus(status, userId)
    dispatch(setUserStatus(status))
}
export const getUserStatus = () => async (dispatch: any, getState:any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response))
}


export default GalleryReducer
