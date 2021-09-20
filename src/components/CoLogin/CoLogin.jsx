import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Row, Col, Card } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import SiteFooter from '../Footer/SiteFooter';
import PHeader from '../PageHeader/PHeader';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;
class CoLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadings: [],
            h: '',
            m: '',
            s: '',
            data: [],
            email: '',
            password: ''
        }
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ email: value })
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }


    handleSubmit = () => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[0] = true;

            return {
                loadings: newLoadings,
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[0] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 6000);

        //data
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch('http://localhost:8090/doctor/signin', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            if (data.token) {
                window.localStorage.setItem('token', data.token)
                window.localStorage.setItem('user_id', data.msg._id)
                window.localStorage.setItem('name', data.msg.fullName)
                window.localStorage.setItem('user_type', 'doctor')
                console.log(data.msg._id);
                window.location.replace('/doctor/dashboard')
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
        })

    }

    fetchUsernames = () => {
        fetch('http://localhost:8090/doctorA/get-my-name').then(res => res.json()).then(data => {
            this.setState({ data: data })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.fetchUsernames()
    }

    render() {
        const { loadings } = this.state;
        return (
            <Layout className="layout" style={{ height: "100vh" }}>
                <Header>

                </Header>
                <PHeader />
                <Content style={{ padding: '0px 50px' }}>
                    <div className="site-layout-content" style={{ backgroundColor: 'transparent' }}>
                        <Row>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://images.unsplash.com/photo-1606166155766-87872211cd0e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />}
                                    onClick={() =>{window.location.replace('/patientlogin')}}
                                >
                                    <Meta title="Patient Login"  />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://images.unsplash.com/photo-1560582861-45078880e48e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />}
                                    onClick={() =>{window.location.replace('/doctor')}}
                                >
                                    <Meta title="Doctor Login"  />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://images.unsplash.com/photo-1579356687668-cbdd5a551c18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80" />}
                                    onClick={() =>{window.location.replace('/receptionist-login')}}
                                >
                                    <Meta title="Receptionist LOgin"  />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://images.unsplash.com/photo-1587500154541-1cafd74f0efc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />}
                                    onClick={() =>{window.location.replace('/staff-login')}}
                                >
                                    <Meta title="Staff Login(Nurse/Lab staff)"  />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <SiteFooter />
            </Layout>
        );
    }
}

export default CoLogin;