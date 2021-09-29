import React, { Component } from 'react'
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Typography, Image , notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import Logo from '../../../assets/img/PMS.Temp.logo.png'
import { green } from '@material-ui/core/colors';
import axios from "axios";

const { Option } = Select;
const { Content } = Layout;
const { Title } = Typography;

export default class RegisterStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form,
            firstName: '',
            lastName: '',
            NIC:'',
            mobileNumber: '',
            email:'',
            password:'',
            role: ''

        }
    }

    componentDidUpdate() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
    }
    componentDidMount() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
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
                md: {
                    span: 12,
                },
                lg: {
                    span: 12,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
                md: {
                    span: 24,
                },
                lg: {
                    span: 24,
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

            const data = {
                NIC: values.NIC,
                firstName: values.Fname,
                lastName: values.Lname,
                email: values.email,
                mobileNumber: values.mobileNumber,
                password: values.password,
                role: values.role
            }

            const url = "http://localhost:8090/staff/register";
            axios.post(url, data).then((res) => {
                if(res.data.status === 201){
                    notification['success']({
                        message: 'Successfully Registered',
                        duration:10,
                        description:
                          'You have registered as a nurse into the system.Please login to use the system.',
                      });
                      setTimeout(function(){ window.location.replace('/staff-login'); }, 5000);
                    
                }
                else if(res.data.status === 401){
                    alert("User Already Exist");
                }
                else{
                    alert("Something went wrong");
                }
            })
        };
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    <Option value="86">+94</Option>
                    <Option value="87">+87</Option>
                </Select>
            </Form.Item>
        );
        return (
            <React.Fragment className="general-background">
                <Row justify="start" align="bottom">
                    <Col span={1}>
                        <Button type="link" icon={<ArrowLeftOutlined style={{ fontSize: '30px', color: '#08c' }}/> } style={{marginBottom: 30 , marginLeft:20}}/>
                    </Col>
                    <Col span={2}>
                        <Title style={{marginTop: 20}}>PMS</Title>
                    </Col>
                    <Col span={10}>
                        <Title level={4} type="secondary" style={{marginBottom: 23}}>Welcome to PMS Patient Management System</Title>
                    </Col>
                </Row>
                <Row justify="space-around" align="middle">
                    <Col span={9}>
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
                                    PMS Medical Staff Registration
                                </Title>
                            </Row>
                            <Row justify="center" align="bottom" style={{
                                        padding: 0,
                                        marginBottom: 20
                                    }}>
                                <Title level={4} type="secondary">Register with your medical staff role</Title>
                            </Row>
                            <Form
                                {...formItemLayout}
                                layout="vertical"
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                                    prefix: '86',
                                }}
                                scrollToFirstError
                            >
                                <Row justify="space-between" align="bottom" >
                                    <Col span={11}>
                                        <Form.Item
                                            name="Fname"
                                            label="First Name"
                                            required
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your first name!',
                                                },
                                            ]}
                                            tooltip="Your first name as in the NIC">
                                            <Input onChange={this.onFirstnameSelect} placeholder="First Name" />
                                        </Form.Item>

                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            name="Lname"
                                            label="Last Name"
                                            required
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your last name!',
                                                },
                                            ]}
                                            tooltip={{ title: 'Your last name as in the NIC' }}
                                        >
                                            <Input onChange={this.onLastnameSelect} placeholder="Last Name" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="space-between" align="bottom">
                                    <Col span={24}>
                                        <Form.Item
                                            span={24}
                                            name="email"
                                            label="E-mail"
                                            tooltip={{ title: 'Enter your personal Email address' }}
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
                                            <Input onChange={this.onEmailSelect} placeholder="Ex : yourname@abc.com" />
                                        </Form.Item>

                                    </Col>
                                </Row>

                                <Row justify="space-between" align="bottom">
                                    <Col span={11}>
                                        <Form.Item
                                            name="mobileNumber"
                                            label="Phone Number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your phone number!',
                                                },
                                                {
                                                    len: 9,
                                                    message: 'Please enter a valid phone number!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                onChange={this.onMobileSelect}
                                                addonBefore={prefixSelector}
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            name="NIC"
                                            label="NIC" 
                                            required
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please entrt your NIC!',
                                                },
                                                // {
                                                //     len: 10,
                                                //     message: 'Please enter a valid NIC!',
                                                // },
                                                {
                                                    pattern: /[0-9]{9}[V|v|x|X]/,
                                                    message: 'Please enter a valid NIC!',
                                                },
                                            ]}
                                            tooltip={{ title: 'Enter your NIC with ther letter "V" at the end.' }}
                                        >
                                            <Input onChange={this.onNicSelect} placeholder="NIC" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify="space-between" align="bottom">
                                    <Col span={11}>
                                        <Form.Item
                                            name="role"
                                            label="Medical Staff Role"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select your Medical Staff Role!',
                                                },
                                            ]}
                                        >
                                            <Select  onChange={this.onRoleSelect} defaultValue="Select role">
                                                <Option value="Nurse">Nurse</Option>
                                                <Option value="Laboratory Staff">Laboratory Staff</Option>
                                                <Option value="Pharmacist" >Pharmacist</Option>
                                            </Select>
                                        </Form.Item>

                                    </Col>
                                </Row>
                                <Row justify="space-between" align="bottom">
                                    <Col span={11}>
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
                                            <Input onChange={this.onPasswordSelect} type="Password" />
                                        </Form.Item>

                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            name="confirmPassword"
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

                                    </Col>
                                </Row>
                                <Row justify="end" align="bottom" style={{ marginRight: 30 }}>
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Content>
                    </Col>
                </Row>

            </React.Fragment>

        )
    }
}
