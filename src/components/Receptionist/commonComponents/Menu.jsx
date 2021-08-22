import {Menu, Button, Layout} from 'antd';
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const SideMenu = () => {

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {

            setCollapsed(!collapsed);

    };

        return (
            <div style={{ width: 256}}>
                <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to = "/add-doctor">
                                Appointments
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to = "/add-doctor">
                                Doctors
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to = "/add-doctor">
                                My Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to = "/add-doctor">
                                Logout
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
            </div>
        );

}

export default SideMenu;