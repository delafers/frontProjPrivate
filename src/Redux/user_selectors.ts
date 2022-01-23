import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.SupportPage.users
}
export const getUsersSuper = createSelector(getUsers,(users) =>{
    return users.filter(u => true)
})
export const getPageSize = (state: AppStateType) => {
    return state.SupportPage.pageSize
}
export const getUsersCount = (state: AppStateType) => {
    return state.SupportPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.SupportPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.SupportPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.SupportPage.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
    return state.SupportPage.filter
}
