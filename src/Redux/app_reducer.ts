import {getUserAuthData} from "./auth_reducer";
import {InferActionTypes} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = typeof initialState

let initialState = {
    initialized: false
};
const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'}as const)
}
type ActionsTypes = InferActionTypes<typeof actions>


const appReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserAuthData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })

}



export default appReducer