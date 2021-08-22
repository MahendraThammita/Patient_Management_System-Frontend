import React, { Component } from 'react';
import { PageHeader, Button, Descriptions, Typography } from 'antd';
import { Avatar } from 'antd';
import {BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';


const RecepPHeader = () =>  {


   const  logout = () => {

    }

    const menu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <a>
                        <Button block type="primary"  onClick={logout}>User Profile</Button>
                    </a>
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