import supportReducer, {actions, InitialStateType} from "./support_reducer";
import {UserType} from "../types/types";

let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Sergo", followed: false, status: "Life is life 0", photos: {small: "smal", large: "LaRGe"}},
            {id: 1, name: "Vitya", followed: false, status: "Life as life 1", photos: {small: "s", large: "L"}},
            {id: 2, name: "Vitya", followed: true, status: "Life as life 2", photos: {small: "s", large: "L"}},
            {id: 3, name: "Vitya", followed: true, status: "Life as life 3", photos: {small: "s", large: "L"}},
        ],
        pageSize: 5,
        filter: {
            term: "",
            friend: null
        },
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [2, 3]
    }
})

test("follow success", () => {
    const NewState = supportReducer(state, actions.followSuccess(1))
    expect(NewState.users[0].followed).toBeFalsy()
    expect(NewState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {
    const NewState = supportReducer(state, actions.unfollowSuccess(2))
    expect(NewState.users[2].followed).toBeFalsy()
    expect(NewState.users[3].followed).toBeTruthy()
})