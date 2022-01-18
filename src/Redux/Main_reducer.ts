import {InferActionTypes} from "./redux-store";

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

let initialState = {
    Top : [
        {name:'Vitalya',sr:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Desert_Electric.jpg/1200px-Desert_Electric.jpg', text:'F'},
        {name:'Sergo',sr:'https://cdn.pixabay.com/photo/2018/05/04/14/11/nature-3374057_960_720.jpg', text:'Ff'},
        {name:'Bibs',sr:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Desert_Electric.jpg/1200px-Desert_Electric.jpg', text:'Fff'},
        {name:'Bobs',sr:'https://cdn.pixabay.com/photo/2018/05/04/14/11/nature-3374057_960_720.jpg', text:'FFF'}
    ],
        BlockPost:null as string| null
}
export type InitialStateType = typeof initialState
export type PostType = {
    name:string,
    sr: string,
    text:string
}
export type Top = Array<PostType>
type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    onPostChangeActCreator: (comment:string) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment} as const),
    addCommentsActioncreator: () => ( {type: ADD_COMMENT} as const)
}


const mainReducer = (state = initialState, action:ActionsType):{ Top: ({ name: string; text: string; sr: string } | { name: string; text: string; sr: string } | { name: string; text: string; sr: string } | { name: string; text: string; sr: string })[]; BlockPost: string | null } => {
    switch (action.type) {
        case ADD_COMMENT: {
            let newcomment = {
                name: state.BlockPost,
                sr: 'https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg',
                text: state.BlockPost
            };
            let stateCopy = {
                ...state,
                Top : [...state.Top, newcomment],
                BlockPost:''
            }
            // @ts-ignore
            return stateCopy;
        }
        case  UPDATE_COMMENT_TEXT: {
            return{
                ...state,
                BlockPost: action.texariacomment,
            }
        }
        default:
            return state;
    }

}



export default mainReducer;