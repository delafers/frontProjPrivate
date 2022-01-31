import React, { Suspense } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import End from "./Components/End/End";
import {Route, BrowserRouter} from "react-router-dom";
import Packs from "./Components/Packs/Packs";
import HeaderContain from "./Components/Header/HeaderContainer";
import {LoginPage} from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app_reducer";
import Preloader from "./Components/common/Preloader/preloader";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./hoc/LazyFunctoin";
import {GalleryPage} from "./Components/Gallery/GalleryContainer"
import {UsersPage} from "./Components/Support/SupportContainer";
import {Button} from "antd";


const SuspendedGallery = withSuspense(GalleryPage)

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
                        <Route path='/gallery/:userId?'render={() => <GalleryPage/>}/>
                        <Route path='/users' render={() => <UsersPage/>}/>
                        <Route path='/Login' render={() => <LoginPage/>}/>
                        <Route path='*' render={() => <div><Button>ok</Button></div>}/>
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