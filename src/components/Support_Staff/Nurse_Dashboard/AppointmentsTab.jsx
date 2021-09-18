import React, { Component } from 'react'
import { Form, Row, Col, Image, Layout, Typography, Dropdown, Menu, Badge, Avatar, message, Divider } from 'antd';
import { TabletFilled, FileAddFilled, HomeFilled, BellOutlined, DownOutlined, LogoutOutlined, DashboardOutlined, EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import { Pie } from '@ant-design/charts';
import OverviewCard from '../DashboardCommon/OverviewCard'
import Logo from '../../../assets/img/pmslogo.png'
import CompleteAppointmentListComponant from './CompleteAppointmentListComponant'

const { Title, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class AppointmentsTab extends Component {
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
        var data = [
            {
                type: 'Compleated',
                value: 28,
            },
            {
                type: 'To be Compleated',
                value: 72,
            },
        ];
        var config = {
            width: 290,
            height: 285,
            padding: 0,
            appendPadding: 0,
            data: data,
            angleField: 'value',
            colorField: 'type',
            color: ['#39C0ED', '#cccccc', '#000000'],
            radius: 1,
            innerRadius: 0.7,
            legend: false,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                autoHide: true,
                style: {
                    textAlign: 'center',
                    fontSize: 10,
                },
            },
            interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: 32,
                    },
                    content: '28%',
                },
            },
        };
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
                                        <Title level={3} style={{ color: 'white', marginTop: 25, marginLeft: 15 }}>PMS Health Care</Title>
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
                                    <DashboardOutlined style={{ marginTop: 5, marginRight: 15 }} /><Text strong>Nursing Dashboard</Text>
                                </Row>

                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1" icon={<HomeFilled />} onClick={() => window.location.replace('/NurseDashboard')}>
                                    Home
                                </Menu.Item>
                                <Menu.Item key="2" icon={<TabletFilled />}  onClick={() => window.location.replace('/Nurse-appointments')}>
                                    Appointments
                                </Menu.Item>
                                <Menu.Item key="3" icon={<FileAddFilled />}  onClick={() => window.location.replace('/Nurse-samples')}>
                                    Sample Collections
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <WelcomeSection />
                            <Row>
                                <Col span={18}>
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            padding: 24,
                                            margin: 16,
                                        }}
                                    >
                                        <Row>
                                            <Col span={7}>
                                                <Pie {...config} />
                                            </Col>
                                            <Col span={15} offset={1}>
                                                <Row justify='start'>
                                                    <Title level={3}>Appontment</Title>
                                                </Row>
                                                <Row justify='start' style={{ marginTop: 10 }}>
                                                    <Col span={8}>
                                                        <Badge color="#39C0ED" /> <Text type="secondary" strong>Compleated </Text>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Text strong>28 </Text>
                                                    </Col>
                                                </Row>
                                                <Row justify='start' style={{ marginTop: 10 }}>
                                                    <Col span={8}>
                                                        <Badge color="#cccccc" /><Text type="secondary" strong>To be Compleated </Text>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Text strong>28 </Text>
                                                    </Col>
                                                </Row>
                                                <Row justify='start' style={{ marginTop: 30 }}>
                                                    <Title level={3}>Next Appontment</Title>
                                                </Row>
                                                <Row>
                                                    <Col span={3}>
                                                        <Avatar
                                                            src="https://image.pngaaa.com/408/81408-middle.png"
                                                            size={{ xs: 24, sm: 32, md: 40, lg: 80, xl: 80, xxl: 100 }}
                                                        />,
                                                    </Col>
                                                    <Col span={20} offset={1}>
                                                        <Row>
                                                            <Text strong>Lorem, ipsum dolor <Link href="#" target="_blank"> Appointment </Link> for doctor  <Text type="success"> Doctor Name. </Text></Text>
                                                        </Row>
                                                        <Row>
                                                            <Title strong type="danger" level={4}>16:25:00</Title>
                                                        </Row>
                                                        <Row>
                                                            <Col span={14} offset={10}>
                                                                <Link href="https://ant.design" target="_blank" strong>
                                                                    <EditTwoTone /> Create Prescription
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Content>
                                </Col>
                                <Col span={6}>
                                    <OverviewCard />
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <CompleteAppointmentListComponant />
                                </Col>

                            </Row>

                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
