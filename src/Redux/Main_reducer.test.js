import mainReducer, {addCommentsActioncreator} from "./Main_reducer";

let state = {
    Top : [
        {name:'Vitalya',sr:'https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg', text:'F'},
        {name:'Sergo',sr:'https://sun9-65.userapi.com/ynXBykVMqtSztMSVy0JJ7GZzRQ-UvBjXPrEHjg/G-DApSuAO50.jpg', text:'Ff'},
        {name:'Bibs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'Fff'},
        {name:'Bobs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'FFF'}
    ],}
it("normal test", () => {
    let action = addCommentsActioncreator()
    let newState = mainReducer(state, action)

    expect(newState.Top.length).toBe(5)
})


