import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Button, Col, Menu, Row} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}
const HeaderApp: React.FC<PropsType> = (props) => {
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">main</Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    {props.isAuth
                        ? <a>{props?.login} <Avatar icon={<UserOutlined/>} />  <Button onClick={props.logout}>Log out</Button></a>
                        : <NavLink to='/login' className={s.header}>Profile</NavLink>}

                </Col>
            </Row>
        </Header>
            /*<header className={s.header}>
                <a>
                    <img src='https://pngimg.com/uploads/photoshop/photoshop_PNG11.png' />
                </a>

            </header>*/
    );
}
export default HeaderApp