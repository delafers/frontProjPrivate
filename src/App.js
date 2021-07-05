import './App.css';
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import React from "react";
import End from "./Components/End/End";
import {Route, BrowserRouter} from "react-router-dom";
import Packs from "./Components/Packs/Packs";
import GalleryContainer from "./Components/Gallery/GalleryContainer";
import SupportContainer from "./Components/Support/SupportContainer";
import HeaderContain from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app_reducer";
import Preloader from "./Components/common/Preloader/preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContain/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route exact path='/' render={() => <Main/>}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/packs' render={() => <Packs/>}/>
                        <Route path='/gallery/:userId?' render={() => <GalleryContainer/>}/>
                        <Route path='/Support' render={() => <SupportContainer/>}/>
                        <Route path='/Login' render={() => <Login/>}/>
                    </div>
                    <End/>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = (state) =>({
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps,{initializeApp}))(App)
