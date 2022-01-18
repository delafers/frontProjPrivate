import mainReducer from "./Main_reducer.ts";
import GalleryReducer from "./Galerey_reducer";



let store = {
     _state: {
        GalleryPage : {
            GalleryAccounts : [
                {class: 'Nature', name: 'https://sun9-40.userapi.com/impg/IpcbkULm7LqC4XQYLSG_swLa5cdNXXJ4QDerjQ/kdOHf8W9pUc.jpg?size=1080x754&quality=96&proxy=1&sign=9668b310115895160a96b40a1f0a0ba1&type=album'},
                {class: 'Brains', name: 'https://sun9-19.userapi.com/impg/4cJlx83BGHrmc-qVpGH4db0aXKPihIP3w2dleA/sG643_rh_h0.jpg?size=1080x769&quality=96&proxy=1&sign=1b706df2572e01cd8a9ecc31bc900c14&type=album'},
                {class: 'Games', name: 'https://sun9-9.userapi.com/impg/315dd_uMOkpAmL5X4VwiD_L_9SZRAkZjVrZCPw/g4LPT_10jkw.jpg?size=277x329&quality=96&proxy=1&sign=37cd58191b5cf139cc7e98607d033033&type=album'}
            ],
            BlockPost: 'send img'
        },
        MainPage:{
            Top : [
                {name:'Vitalya',sr:'https://sun9-39.userapi.com/cLfRr5r8qAegXK0iJE8wQ1oxwoIeIqjTHaz4WQ/8ItJwatmRkc.jpg', text:'F'},
                {name:'Sergo',sr:'https://sun9-65.userapi.com/ynXBykVMqtSztMSVy0JJ7GZzRQ-UvBjXPrEHjg/G-DApSuAO50.jpg', text:'Ff'},
                {name:'Bibs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'Fff'},
                {name:'Bobs',sr:'https://sun9-2.userapi.com/hxW2DIIow2xnjuAp4FnCHJb_7O1rN1Gbpzq-LQ/7wYUczhdQuI.jpg', text:'FFF'}
            ],
            BlockPost:'comment'
        },
        Packs : [
            {name:'Filtres',linkdisk:'http'},
            {name:'Textures',linkdik:'ppp'},
            {name:'Glare',linkdisk:'0'},
            {name:'Action',linkdisk:'12'},
            {name:'Brush',linkdisk:'net'},
            {name:'Gradient',linkdisk:'13'},
            {name:'Pattern',linkdisk:'AA'},
        ]
    },
     _callSubscriber() {
        console.log('State changed');
    },

    getState() {
      return    this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },


    dispatch(action) {

        this._state.MainPage = mainReducer(this._state.MainPage, action);
        this._callSubscriber(this._state)

        this._state.GalleryPage = GalleryReducer(this._state.GalleryPage, action)
        this._callSubscriber(this._state)

    }


}


export default store