import {createSelector} from "reselect";

export const getUsers = (state) => {
    return state.SupportPage.users
}
export const getUsersSuper = createSelector(getUsers,(users) =>{
    return users.filter(u => true)
})
export const getPageSize = (state) => {
    return state.SupportPage.pageSize
}
export const getUsersCount = (state) => {
    return state.SupportPage.totalUsersCount
}
export const getCurrentPage = (state) => {
    return state.SupportPage.currentPage
}
export const getIsFetching = (state) => {
    return state.SupportPage.isFetching
}
export const getFollowingInProgress = (state) => {
    return state.SupportPage.followingInProgress
}
