import React, { Component } from 'react'
import { Form, Row, Col, Button, Layout, Typography, Image, Menu, Breadcrumb, Avatar } from 'antd';
import { UserOutlined, NotificationOutlined, LaptopOutlined, AntDesignOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import Logo from '../../../assets/img/PMS.Temp.logo.png'

const { Title } = Typography;
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
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 16,
                                    minHeight: 80,
                                }}
                            >
                                <Breadcrumb>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Title level={3}>PMS OPD</Title>
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={6}>
                                                <Avatar
                                                    src="https://image.pngaaa.com/408/81408-middle.png"
                                                    size={{ xs: 24, sm: 32, md: 40, lg: 100, xl: 100, xxl: 100 }}
                                                />,
                                            </Col>
                                            <Col span={18}>
                                                <Row>
                                                    <Title level={4}>Good morning, Jenny Keller, have a great day!</Title>
                                                </Row>
                                                <Row>
                                                    <Title level={5}>Assistant Nursing Officer / OPD</Title>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>

                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        )
    }
}
