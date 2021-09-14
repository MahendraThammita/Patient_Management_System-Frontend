import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MinusSquareOutlined,
  PlusCircleOutlined,
  CheckSquareOutlined,
  CalendarOutlined
} from '@ant-design/icons';

import MakeAppointments from './MakeAppointments'
import MyAppointments from './MyAppointments'
import AppointmentCalendar from './AppointmentCalendar';
import Profile from './PatientProfile';
import AllDoctors from './AllDoctors';


import Logo from './../../assets/img/pmslogo.png'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class PatientDash extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            collapsed: false,
            selectedItem:'1'
        }
    }

    
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    render() {

        var component
        if(this.state.selectedItem === '1'){
            component = <Profile/>
        }
        else if(this.state.selectedItem === '2'){
            component = <AllDoctors/>
        }
        else if(this.state.selectedItem === '3'){
            component = <MyAppointments/>
        }
        else if(this.state.selectedItem === '4'){
            component = <MakeAppointments/>
        }
        else if(this.state.selectedItem === '5'){
            component = <AppointmentCalendar/>
        }

        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                {/* <div className="logo"> */}
                    <img src={Logo} alt="" style={{width:"70%", paddingLeft:"20%", paddingTop:"5%", paddingBottom:"5%"}}/>
                {/* </div> */}
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {this.setState({ selectedItem: '1'})}}>
                        My Profile
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />} onClick={() => {this.setState({ selectedItem: '2'})}}>
                        Doctors
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MinusSquareOutlined />} title="Appointments">
                        <Menu.Item key="3" icon={<CheckSquareOutlined />} onClick={() => {this.setState({ selectedItem: '3'})}} >My Appointments</Menu.Item>
                        <Menu.Item key="4" icon={<PlusCircleOutlined />} onClick={() => {this.setState({ selectedItem: '4'})}}>Create a new one</Menu.Item>
                        <Menu.Item key="5" icon={<CalendarOutlined />} onClick={() => {this.setState({ selectedItem: '5'})}}>Schedule</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6" icon={<FileOutlined />}>
                        Reports
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: "1.2%", display:"flex",backgroundColor:"#001529"}} >
                        <h4 style={{color:"white"}}>Patient Management System</h4>
                        {/* <h6 style={{color:"white"}}>Logout</h6> */}
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Patient</Breadcrumb.Item>
                            {/* <Breadcrumb.Item>Patient</Breadcrumb.Item> */}
                        </Breadcrumb>

                        
                        {component}
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default PatientDash
