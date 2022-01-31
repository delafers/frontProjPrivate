import React, {useEffect} from 'react';
import {ActionsType, getUserProfile} from "../../Redux/Galerey_reducer"
import Gallery from "./Gallery";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../types/types";
import queryString from "querystring";

type MapStateProps = {
}
type DispatchPropsType = {

}
type routeProps = {
    userId: string
}
export const GalleryPage: React.FC = (props) => {
    const history = useHistory()
    let parsed = history.location.pathname.split("/")[2]
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const dispatch = useDispatch()
    const getUserProfile1 = (userId: number) => {
        dispatch(getUserProfile(userId))
    }
    useEffect(() => {
        // @ts-ignore
       if( parsed === undefined){
           parsed = "6974"
       }
        let userId: number = +parsed
        if (!userId) {
            // @ts-ignore
            userId = authorizedUserId;
        } else {
        }
        getUserProfile1(userId)
    }, [parsed])
    return <>
        <Gallery/>
    </>
}
