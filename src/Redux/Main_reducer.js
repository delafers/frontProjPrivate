const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

let initialState = {
    Top : [
        {name:'Vitalya',sr:'https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg', text:'F'},
        {name:'Sergo',sr:'https://sun9-65.userapi.com/ynXBykVMqtSztMSVy0JJ7GZzRQ-UvBjXPrEHjg/G-DApSuAO50.jpg', text:'Ff'},
        {name:'Bibs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'Fff'},
        {name:'Bobs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'FFF'}
    ],
        BlockPost:'comment'
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            debugger;
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
export const onPostChangeActCreator = (comment) => {
    return {
        type: UPDATE_COMMENT_TEXT, texariacomment: comment
    }
}
export const addCommentsActioncreator = () => {
    return {
        type: ADD_COMMENT
    }
}


export default mainReducer;