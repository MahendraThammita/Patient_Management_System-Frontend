import {Menu, Button, Layout} from 'antd';
import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    SnippetsOutlined ,
    UnorderedListOutlined ,
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
                        <Menu.Item key="1" icon={<UnorderedListOutlined  />}>
                            <Link to = "/add-doctor">
                                Appointments
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TeamOutlined   />}>
                            <Link to = "/add-doctor">
                                Doctors
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined  />}>
                            <Link to = "/add-doctor">
                                My Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<SnippetsOutlined  />}>
                            <Link to = "/receptionist-report">
                                Reports
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                        </Menu.Item>
                        <Menu.Item>
                        </Menu.Item>
                        <Menu.Item>
                        </Menu.Item>
                        <Menu.Item>
                        </Menu.Item>


                    </Menu>
                </Sider>
            </div>
        );

}

export default SideMenu;