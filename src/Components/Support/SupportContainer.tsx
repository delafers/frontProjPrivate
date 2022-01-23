import React from 'react';
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/preloader";
import {getIsFetching} from "../../Redux/user_selectors";
import {Chat} from './Support';


type UsersPageProps = {

}
export const UsersPage: React.FC<UsersPageProps> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Chat />
    </>
}
