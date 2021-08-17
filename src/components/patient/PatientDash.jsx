import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MinusSquareOutlined,
  PlusCircleOutlined,
  CheckSquareOutlined
} from '@ant-design/icons';

import Logo from './../../assets/img/pmslogo.png'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class PatientDash extends Component {

    state = {
        collapsed: false,
    };
    
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className="logo">
                    <img src={Logo} alt="" style={{width:"70%", paddingLeft:"20%", paddingTop:"5%", paddingBottom:"5%"}}/>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        My Profile
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        Doctors
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MinusSquareOutlined />} title="Appointments">
                        <Menu.Item key="3" icon={<CheckSquareOutlined />} >My Appointments</Menu.Item>
                        <Menu.Item key="4" icon={<PlusCircleOutlined />}>Create a new one</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: "1.2%", display:"flex"}} >
                        <h4 style={{color:"white"}}>Patient Management System</h4>
                        {/* <h6 style={{color:"white"}}>Logout</h6> */}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default PatientDash
