import React, { Component } from 'react';
import { PageHeader, Button, Descriptions, Typography } from 'antd';
import { Avatar } from 'antd';
import {BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import ClockBar from "./Clock";

const RecepPHeader = () =>  {

    const  history = useHistory();

    const username = localStorage.getItem('user-name');
    const userID = localStorage.getItem('user-id');

   const  logout = () => {

       localStorage.clear();
       history.push("/receptionist-login");
    }

    const menu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <Link to ={`receptionist-profile/${userID}`}>
                        <Button block type="primary" >{username}</Button>
                    </Link>
                </Menu.Item>
                <Menu.Item onClick={logout}>
                    <a>
                        <Button block type="primary" danger onClick={logout}>LOG OUT</Button>
                    </a>
                </Menu.Item>
            </Menu>
        )
    }
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Dashboard"
                    subTitle={<ClockBar/>}
                    extra={[
                        <BellOutlined style={{ fontSize: '25px', padding: '0 10px 0 10px' }} />,
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <Avatar style={{ margin: "0 10px 0 20px" }}>U</Avatar>
                        </Dropdown>,
                    ]}
                >
                </PageHeader>
            </div>
        );

}

export default RecepPHeader;