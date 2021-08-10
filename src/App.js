import React, { Suspense } from 'react';import './App.css';
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import End from "./Components/End/End";
import {Route, BrowserRouter} from "react-router-dom";
import Packs from "./Components/Packs/Packs";
//import GalleryContainer from "./Components/Gallery/GalleryContainer";
//import SupportContainer from "./Components/Support/SupportContainer";
import HeaderContain from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app_reducer";
import Preloader from "./Components/common/Preloader/preloader";
import store from "./Redux/redux-store";
import {withSuspense} from "./hoc/LazyFunctoin";

const SupportContainer = React.lazy(() => import("./Components/Support/SupportContainer"))
const GalleryContainer = React.lazy(() => import('./Components/Gallery/GalleryContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContain/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route path='/main' render={() => <Main/>}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/packs' render={() => <Packs/>}/>
                        <Route path='/gallery/:userId?' render={withSuspense(GalleryContainer)}                     />
                        <Route path='/Support' render={withSuspense(SupportContainer)}/>
                        <Route path='/Login' render={() => <Login/>}/>
                    </div>
                    <End/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) =>(
{initialized: state.app.initialized})

let AppContainer = compose(
connect(mapStateToProps,{initializeApp}))(App)

const LastFrontApp = (props) =>
{
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default LastFrontApp
export
{
    AppContainer
}