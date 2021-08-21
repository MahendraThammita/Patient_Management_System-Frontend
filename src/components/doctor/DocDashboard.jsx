import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import SiteFooter from '../Footer/SiteFooter';
import DashPHeader from '../PageHeader/DashPHeader';

import { Statistic, Card, Row, Col, Tabs } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PendingApps from './PendingApps';
import FinApps from './FinApps';
import DecApps from './DecApps';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

class DocDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            h: '',
            m: '',
            s: '',
            count : {}
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    componentDidMount() {
        this.startTime()

        //fetch appointments
        fetch("http://localhost:8000/doctorA/count/" + window.localStorage.getItem('user_id'), {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ count : data })
        })
    }

    startTime = () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.setState({ h, m, s })
        setTimeout(this.startTime, 1000);
    }

    checkTime = (i) => {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
        const { collapsed } = this.state;

        var pen = Array(this.state.count.pen)
        var fin = Array(this.state.count.fin)
        var dec = Array(this.state.count.dec)

        
        return (
            <Layout style={{ minHeight: '100vh', fontStyle: 'initial', fontWeight: 'bold' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Appointments
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
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
                    <DashPHeader />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Doctor</Breadcrumb.Item>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>

                        <div className="site-statistic-demo-card" style={{ marginBottom: "20px" }}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Pending Appointments"
                                            value={pen.length}
                                            precision={0}
                                            valueStyle={{ color: '#3f8600', textAlign: 'left', fontSize: '2rem' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Declined Appointments"
                                            value={dec.length}
                                            precision={0}
                                            valueStyle={{ color: '#cf1322', textAlign: 'left', fontSize: '2rem' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Completed Appointments"
                                            value={fin.length}
                                            precision={0}
                                            valueStyle={{ color: '#cf1322', textAlign: 'left', fontSize: '2rem' }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic title="Current Time" value={this.state.h + ":" + this.state.m + ":" + this.state.s} valueStyle={{ color: 'black', textAlign: 'left', fontSize: '2rem' }} />
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="Pending Appointments" key="1">
                                    <PendingApps/>
                                </TabPane>
                                <TabPane tab="Finished Appointments" key="2">
                                    <FinApps/>
                                </TabPane>
                                <TabPane tab="Declined Appointments" key="3">
                                    <DecApps/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>
                    <SiteFooter />
                </Layout>
            </Layout>
        );
    }
}

export default DocDashboard;