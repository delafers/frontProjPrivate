import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import Nav from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main/Main";
import Profile from "./Components/Profile/Profile";
import End from "./Components/End/End";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
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
import {Button, Col, Row} from "antd";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import s from "./Components/NavBar/NavBar.module.css";
import Avatar from 'antd/lib/avatar/avatar';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


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
        return <Layout>
                <HeaderContain/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                                <Menu.Item key="1">
                                    <NavLink to='/' activeClassName={s.active}>Main</NavLink>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <NavLink to='/gallery' activeClassName={s.active}>Gallery</NavLink>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <NavLink to='/packs' activeClassName={s.active}>Packs</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Users">
                                <Menu.Item key="5">
                                    <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            <Switch>
                                <Route exact path='/' render={() => <Main/>}/>
                                <Route path='/profile' component={Profile}/>
                                <Route path='/packs' render={() => <Packs/>}/>
                                <Route path='/gallery/:userId?' render={() => <GalleryPage/>}/>
                                <Route path='/users' render={() => <UsersPage/>}/>
                                <Route path='/Login' render={() => <LoginPage/>}/>
                                <Route path='*' render={() => <div><Button type={'primary'}>Page not found</Button></div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
               
            /*<BrowserRouter>
                <div className='app-wrapper'>

                    <Nav/>
                    <div className='app-wrapper-content'>

                    </div>
                    <End/>
                </div>
            </BrowserRouter>*/
    }
}

const mapStateToProps = (state: AppStateType) => (
    {initialized: state.app.initialized})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

const LastFrontApp: React.FC = () => {
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