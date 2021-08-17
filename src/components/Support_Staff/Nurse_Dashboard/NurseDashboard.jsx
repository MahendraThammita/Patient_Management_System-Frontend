import React, { Component } from 'react'
import { Form, Row, Col, Button, Layout, Typography, Divider, Menu, Badge, Avatar } from 'antd';
import { UserOutlined, NotificationOutlined, LaptopOutlined, EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import SummerySection from '../DashboardCommon/SummerySection'
import AppointmentChart from './AppointmentChart'
import CollectionsChart from './CollectionsChart'
import OverviewCard from '../DashboardCommon/OverviewCard'
import JobQueueComponant from './JobQueueComponant'

const { Title, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
    }


    render() {

        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />

                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <WelcomeSection />
                            <Row>
                                <Col span={6}>
                                    <SummerySection />
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col span={8}>
                                            <AppointmentChart />
                                        </Col>
                                        <Col span={8}>
                                            <CollectionsChart />
                                        </Col>
                                        <Col span={8}>
                                            <OverviewCard />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <JobQueueComponant/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        )
    }
}
