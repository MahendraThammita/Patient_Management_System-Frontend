import React, { Component } from 'react'
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Typography, Image } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import '../../../assets/css/mahen_general.css';
import PHeader from '../../PageHeader/PHeader';
import Logo from '../../../assets/img/PMS.Temp.logo.png'

const { Content } = Layout;
const { Title } = Typography;

export default class LoginStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
    }

    componentDidUpdate() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
    }
    componentDidMount() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
    }

    render() {
        return (
            <React.Fragment>
                <PHeader />
                <Row justify="space-around" align="middle">
                    <Col span={6}>
                        <Content
                            className="content-general"
                            style={{
                                padding: 24,
                            }}
                        >
                            <Row justify="center" align="bottom">
                                <Image
                                    width={60}
                                    src={Logo}
                                />
                            </Row>
                            <Row justify="center" align="bottom">
                                <Title
                                    level={2}
                                    style={{
                                        padding: 0,
                                        margin: 0
                                    }}>
                                    PMS Medical Staff Login
                                </Title>
                            </Row>
                            <Row justify="center" align="bottom" style={{
                                padding: 0,
                                marginBottom: 20
                            }}>
                                <Title level={4} type="secondary">Your Health is Our Concern</Title>
                            </Row>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Please enter a valid User Name',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block className="login-form-button">
                                        Log in
                                    </Button>
                                </Form.Item>
                                <Row justify="space-around" align="middle">
                                    <Col span={20}>
                                        <Form.Item>

                                            <a className="login-form-forgot" href="" >
                                                Quick Sign-In <GoogleOutlined style={{ fontSize: '20px', color: '#08c', margin:5 }} />
                                            </a>
                                            <a className="login-form-forgot" href="">
                                                <FacebookOutlined style={{ fontSize: '20px', color: '#08c' , margin:5}} />
                                            </a>
                                            <a className="login-form-forgot" href="">
                                                <LinkedinOutlined style={{ fontSize: '20px', color: '#08c' , margin:5}} />
                                            </a>
                                        </Form.Item>

                                    </Col>
                                    <Col span={4}>
                                        <Form.Item>
                                            <a className="login-form-forgot" href="">
                                                Sign Up
                                            </a>
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </Form>
                        </Content>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
