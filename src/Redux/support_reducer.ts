import axios from "axios";
import {updateObjectInArray} from "../utils/objectHelper";
import {PhotosType, UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersAPI";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [2, 3] as Array<number> //id пользователей, на которых нельзя подписатья
};
export type InitialStateType = typeof initialState

const supportReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.count
            }

        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            // @ts-ignore
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action)
            }
        default:
            return state;

    }
}


export const actions = {
    followSuccess : (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowSuccess : (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        count: totalCount
    }as const),
    toggleIsFetching : (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowingProgress: (userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        userId,
        isFetching: true
    } as const)
}

type ActionTypes = InferActionTypes<typeof actions>

type getStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = BaseThunkType<ActionTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));

    }
}
export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                          actionCreator: (userId: number) => ActionTypes ) => {
    dispatch(actions.toggleIsFetching(true))
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFetching(false))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export default supportReducer