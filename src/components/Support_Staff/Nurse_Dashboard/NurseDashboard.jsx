import React, { Component } from 'react'
import { Form, Row, Col, Image, Layout, Typography, Dropdown, Menu, Badge, Avatar, message } from 'antd';
import { TabletFilled, FileAddFilled, HomeFilled, BellOutlined, DownOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import SummerySection from '../DashboardCommon/SummerySection'
import AppointmentChart from './AppointmentChart'
import CollectionsChart from './CollectionsChart'
import OverviewCard from '../DashboardCommon/OverviewCard'
import JobQueueComponant from './JobQueueComponant'
import Logo from '../../../assets/img/pmslogo.png'

const { Title, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
        this.onDropdownMenuClick = this.onDropdownMenuClick.bind(this);

    }

    onDropdownMenuClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    render() {
        const menu = (
            <Menu onClick={this.onDropdownMenuClick}>
                <Menu.Item key="1" icon={<LogoutOutlined />}>Log Out</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Layout>
                    <Header className="header">

                        <Row justify='start' align='middle'>
                            <Col span={6}>
                                <Row justify='space-between' align='middle'>
                                    <Col span={6}>
                                        <div className="logo" >
                                            <Image
                                                width={100}
                                                src={Logo}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Title level={3} style={{ color: 'white', marginTop: 25 , marginLeft:15 }}>PMS Health Care</Title>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={3} offset={15}>
                                <Row>
                                    <Col span={8}>
                                        <Badge count={5}>
                                            <Avatar size="default" icon={<BellOutlined />} />
                                        </Badge>
                                    </Col>
                                    <Col span={16}>
                                        <Dropdown overlay={menu}>
                                            <a className="ant-dropdown-link" style={{ color: 'white' }} onClick={e => e.preventDefault()}>
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                Sara Meti <DownOutlined />
                                            </a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <div className="logo">
                                <Row justify='center'>
                                <DashboardOutlined style={{marginTop:5 , marginRight:15}} /><Text strong>Nursing Dashboard</Text>
                                </Row>
                                
                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1" icon={<HomeFilled />}>
                                    Home
                                </Menu.Item>
                                <Menu.Item key="2" icon={<TabletFilled />}>
                                    Appointments
                                </Menu.Item>
                                <Menu.Item key="3" icon={<FileAddFilled />}>
                                    Sample Collections
                                </Menu.Item>
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
                                            <JobQueueComponant />
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
