import React, { Suspense } from 'react';
import './App.css';
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import End from "./Components/End/End";
import {Route, BrowserRouter} from "react-router-dom";
import Packs from "./Components/Packs/Packs";
import HeaderContain from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app_reducer";
import Preloader from "./Components/common/Preloader/preloader";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./hoc/LazyFunctoin";
import {galleryContainer} from "./Components/Gallery/GalleryContainer"
import Gallery from "./Components/Gallery/Gallery";

const SupportContainer = React.lazy(() => import("./Components/Support/SupportContainer"))
//const GalleryContainer = React.lazy(() => import('./Components/Gallery/GalleryContainer'))

//const SuspendedGallery = withSuspense(GalleryContainer)
const SuspendedSupport = withSuspense(SupportContainer)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
class App extends React.Component<MapPropsType & DispatchPropsType> {
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
                        <Route exact path='/' render={() => <Main/>}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/packs' render={() => <Packs/>}/>
                        <Route path='/gallery/:userId?'render={() => <SuspendedSupport/>}/>
                        <Route path='/users' render={() => <SuspendedSupport/>}/>
                        <Route path='/Login' render={() => <Login/>}/>
                    </div>
                    <End/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state:AppStateType) =>(
{initialized: state.app.initialized})

let AppContainer = compose<React.ComponentType>(
connect(mapStateToProps,{initializeApp}))(App)

const LastFrontApp:React.FC = () =>
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