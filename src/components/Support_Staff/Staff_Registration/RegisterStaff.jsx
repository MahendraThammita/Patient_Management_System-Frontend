import React, { Component } from 'react'
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Typography , Image } from 'antd';
import '../../../assets/css/mahen_general.css';
import Logo from '../../../assets/img/PMS.Temp.logo.png'

const { Option } = Select;
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export default class RegisterStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
    }

    componentDidUpdate() {
        document.querySelector("body").style.backgroundColor = "#c0c0c0";
    }
    componentDidMount() {
        document.querySelector("body").style.backgroundColor = "#c0c0c0";
    }


    render() {
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
        };
        return (
            <React.Fragment className="general-background">
                <Row justify="start" align="bottom">
                    <Col span={2}>
                        <Title>PMS</Title>
                    </Col>
                    <Col span={10}>
                        <Title level={4} type="secondary">Welcome to PMS Patient Management System</Title>
                    </Col>
                </Row>
                <Row justify="space-around" align="middle">
                    <Col span={9}>
                        <Content
                            className="content-general"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
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
                                    PMS Medical Staff Registration
                                </Title>
                            </Row>
                            <Row justify="center" align="bottom">
                                <Title level={4} type="secondary">Register with your medical staff role</Title>
                            </Row>
                            <Form
                                {...formItemLayout}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                                    prefix: '86',
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="nickname"
                                    label="Nickname"
                                    tooltip="What do you want others to call you?"
                                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                                >
                                    <Input />
                                </Form.Item>



                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[{ required: true, message: 'Please select gender!' }]}
                                >
                                    <Select placeholder="select your gender">
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="captcha"
                                                noStyle
                                                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button>Get captcha</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>

                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the <a href="">agreement</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Content>
                    </Col>
                </Row>

            </React.Fragment>

        )
    }
}
