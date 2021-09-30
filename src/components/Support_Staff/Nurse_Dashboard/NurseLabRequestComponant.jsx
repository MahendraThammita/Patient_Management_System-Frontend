import React, { Component } from 'react'
import { Form, Row, Col, Image, Layout, Typography, Dropdown, Menu, Badge, Avatar, message, Input, Button, InputNumber, Radio, Select } from 'antd';
import { TabletFilled, FileAddFilled, HomeFilled, BellOutlined, DownOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import OverviewCard from '../DashboardCommon/OverviewCard'
import PatientCard from '../DashboardCommon/PatientCard'
import Logo from '../../../assets/img/pmslogo.png'

const { Title, Text } = Typography;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
export default class NurseLabRequestComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
        this.onDropdownMenuClick = this.onDropdownMenuClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }

    onDropdownMenuClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value) {
        console.log(`selected ${value}`);
    }
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
                                            paddingLeft: 24,
                                            paddingRight: 24,
                                            paddingTop: 0,
                                            paddingBottom: 24,
                                            margin: 16,
                                        }}
                                    >
                                        <Row style={{ paddingTop: 10 }}>
                                            <Title level={2}>Laboratory Test Request</Title>
                                        </Row>
                                        <Row>
                                            <Text strong type="secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, aspernatur?</Text>
                                        </Row>
                                        <Row justify='start' style={{ paddingTop: 30 }}>
                                            <Col span={24}>
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 6 }}
                                                    wrapperCol={{ span: 12 }}
                                                    onFinish={this.state.onFinish}
                                                    onFinishFailed={this.state.onFinishFailed}
                                                >
                                                    <Form.Item
                                                        label="Full Name"
                                                        name="fullName"
                                                        rules={[{ required: true, message: 'Please input the fullname of the patient!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <Form.Item label="Age">
                                                        <Form.Item name="patient-age" noStyle>
                                                            <InputNumber min={0} />
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Years</span>
                                                    </Form.Item>

                                                    <Form.Item
                                                        label="Test Name"
                                                        name="testName"
                                                        rules={[{ required: true, message: 'Please input the name of the test!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Speciman Number"
                                                        name="specimanNo"
                                                        rules={[{ required: true, message: 'Please input the speciman number!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Speciman Type"
                                                        name="specimanNo"
                                                        rules={[{ required: true, message: 'Please input the speciman number!' }]}
                                                    >
                                                        <Select defaultValue="Selecr Speciman Type" style={{ width: 120 }} onChange={this.state.handleChange}>
                                                            <Option value="1">Blood</Option>
                                                            <Option value="2">Urine</Option>
                                                            <Option value="3" >Other</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Row>
                                                        <Col span={16} style={{ textAlign: 'center' }}>
                                                            <Button type="primary" htmlType="submit">
                                                                Submit
                                                            </Button>
                                                            <Button style={{ marginLeft: 15 }}>
                                                                Save
                                                            </Button></Col>
                                                    </Row>
                                                </Form>
                                            </Col>

                                        </Row>
                                    </Content>
                                </Col>
                                <Col span={6}>
                                    <OverviewCard />
                                    <PatientCard />
                                </Col>
                            </Row>

                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
