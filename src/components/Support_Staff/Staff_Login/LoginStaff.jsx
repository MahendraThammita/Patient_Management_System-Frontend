import React, { Component } from 'react'
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Typography, Image , notification} from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import '../../../assets/css/mahen_general.css';
import PHeader from '../../PageHeader/PHeader';
import Logo from '../../../assets/img/PMS.Temp.logo.png'
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

export default class LoginStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: Form,
            userName:'',
            password:''

        }
    }

    componentDidUpdate() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
    }
    componentDidMount() {
        document.querySelector("body").style.backgroundColor = "#f0f0f0";
    }

    render() {
        const onFinish = (values) => {
            const data = {
                userName: values.userName,
                password: values.password,
            }

            console.log(values);

            const url = "http://localhost:8090/staff/login";
            axios.post(url, data).then((res) => {
                console.log("Status : " , res.data);
                if(res.data.status === 200){
                    notification['success']({
                        message: 'Login Successful',
                        duration:10,
                        description:
                          'Hello , Jenny  welcome to PMS.',
                      });
                    localStorage.setItem("user_id",res.data.user._id);
                    localStorage.setItem("name",res.data.user.Fname + " " + res.data.user.Lname);
                    localStorage.setItem("staffMember-role",res.data.Role);
                    localStorage.setItem("auth-token",res.data.token);
                    console.log("Res Is : " , res);
                    if(res.data.Role === "Nurse"){
                        setTimeout(function(){ window.location.replace('/NurseDashboard'); }, 4000);
                    }
                    else if(res.data.Role === "Laboratory Staff"){
                        setTimeout(function(){ window.location.replace('/labStaff-dashboard'); }, 4000);
                    }
                }
                else if(res.data.status === 401){
                    alert("Invalid credentials!");
                }
                else if(res.data.status === 404){
                    alert("User does not exist!");
                }
                else{
                   console.log(res.data.error);
                }
            })
        };
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
                                onFinish={onFinish}
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Form.Item
                                    name="userName"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please enter your user name!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username/Email" />
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
