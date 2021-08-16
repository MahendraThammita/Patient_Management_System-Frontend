import React, { Component } from 'react'
import { Form, Row, Col, Button, Layout, Typography, Divider, Menu, Breadcrumb, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';


const { Title, Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class WelcomeSection extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
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
                    <Title level={2}>PMS OPD</Title>
                    <Row>
                        <Col span={10}>
                            <Row>
                                <Col span={5}>
                                    <Avatar
                                        src="https://image.pngaaa.com/408/81408-middle.png"
                                        size={{ xs: 24, sm: 32, md: 40, lg: 100, xl: 100, xxl: 100 }}
                                    />,
                                </Col>
                                <Col span={13}>
                                    <Row>
                                        <Title level={4}>Good morning, Jenny Keller, have a great day!</Title>
                                    </Row>
                                    <Row>
                                        <Title level={5} type="secondary">Assistant Nursing Officer / OPD</Title>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row>
                                <Col span={7}>
                                    <Row>
                                        <Text strong type="secondary">Total Appointments(Today)</Text>
                                    </Row>
                                    <Row>
                                        <Title level={3}>56</Title>
                                    </Row>
                                </Col>
                                <Col span={7}>
                                    <Row>
                                        <Text strong type="secondary"> Sample Gatherings(Today)</Text>
                                    </Row>
                                    <Row>
                                        <Title level={3}>56</Title>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Text strong type="secondary"> Total Appointments(Month)</Text>
                                    </Row>
                                    <Row>
                                        <Title level={3}>56</Title>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </div>
        )
    }
}
