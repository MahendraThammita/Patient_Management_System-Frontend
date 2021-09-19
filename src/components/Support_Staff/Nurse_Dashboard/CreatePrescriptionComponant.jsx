import React, { Component } from 'react'
import { Form, Row, Col, Image, Layout, Typography, Dropdown, Menu, Badge, Avatar, message, Input, Button, InputNumber, Radio , notification} from 'antd';
import { TabletFilled, FileAddFilled, HomeFilled, BellOutlined, DownOutlined, LogoutOutlined, DashboardOutlined, EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import OverviewCard from '../DashboardCommon/OverviewCard'
import PatientCard from '../DashboardCommon/PatientCard'
import Logo from '../../../assets/img/pmslogo.png'
import axios from "axios";

const { Title, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class CreatePrescriptionComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form,
            appointment : {},
            patientName : '',
            patientage : '',
            patient_Id : '',
            doctor_Id : '',
            appointmentId : ''
        }
        this.onDropdownMenuClick = this.onDropdownMenuClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);


    }

    fetchAppointments = () =>{
        console.log(window.localStorage.getItem('selected_appointment'))
        fetch('http://localhost:8090/appointment/getById/'+window.localStorage.getItem('selected_appointment'))
        .then(res => res.json()).then(data =>{
          this.setState({appointment: data.data[0] , 
            patientName: data.data[0].patient.fullName , 
            patientage: data.age , 
            patient_Id : data.data[0].patient._id , 
            doctor_Id : data.data[0].doctor._id ,
            appointmentId : data.data[0]._id});
          console.log(this.state.appointmentId);
          window.localStorage.removeItem("selected_appointment");
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        if(typeof(window.localStorage.getItem('selected_appointment')) == 'undefined' || window.localStorage.getItem('selected_appointment') == null){
            window.location.replace('/NurseDashboard')
        }
        this.fetchAppointments()
    }

    savePrescription = ()=>{
        notification['success']({
            message: 'Prescription saved successfully',
            duration:10,
          });
          setTimeout(function(){ window.location.replace('/NurseDashboard'); }, 5000);
    }

    onDropdownMenuClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    onFinish = (values) => {
        const data = {
            weight: values.weight,
            height: values.height,
            sys_pressure: values.sys_pressure,
            dis_pressure: values.dis_pressure,
            specialRemarks_By_Nurse: values.remarks,
            fullName: this.state.patientName,
            previouslyVisited: values.visitedStatus === "1" ? true : false,
            age: this.state.patientage,
            patient : this.state.patient_Id,
            doctor : this.state.doctor_Id,
            status : "Submit By Nurse",
            appointmentId : this.state.appointmentId,
        }
        const url = "http://localhost:8090/prescription/create";
            axios.post(url, data).then((res) => {
                if(res.data.message === "ok"){
                    notification['success']({
                        message: 'Successfully Submited the prescription',
                        duration:10,
                        description:
                          'You have submited the basic prescriptions details for the appointment',
                      });
                      setTimeout(function(){ window.location.replace('/NurseDashboard'); }, 3000);
                    
                }
                else{
                    alert("Something went wrong");
                }
            })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const menu = (
            <Menu onClick={this.onDropdownMenuClick}>
                <Menu.Item key="1" icon={<LogoutOutlined />}>Log Out</Menu.Item>
            </Menu>
        );
        if(this.state.patientName === '')
            return null;
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
                                            <Title level={2}>Prescription (Basic Information)</Title>
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
                                                    onFinish={this.onFinish}
                                                    onFinishFailed={this.onFinishFailed}
                                                >
                                                    <Form.Item
                                                        label="Full Name"
                                                        name="fullName"
                                                        //rules={[{ required: true, message: 'Please input the fullname of the patient!' }]}
                                                    >
                                                        <Input disabled={true} defaultValue={this.state.appointment.patient.fullName}/>
                                                    </Form.Item>

                                                    <Form.Item label="Age">
                                                        <Form.Item name="patient-age" noStyle>
                                                            <InputNumber disabled={true} min={0} defaultValue={this.state.patientage}/>
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Years</span>
                                                    </Form.Item>
                                                    <Form.Item label="Height/Weight">
                                                        <Form.Item name="height" noStyle>
                                                            <InputNumber min={0} />
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Height(Cm)</span>
                                                        <span style={{ marginRight: 15, marginLeft: 15 }}></span>
                                                        <Form.Item name="weight" noStyle>
                                                            <InputNumber min={0} />
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Weight(Kg)</span>
                                                    </Form.Item>
                                                    <Form.Item label="Blood Pressure">
                                                        <Form.Item name="sys_pressure" noStyle>
                                                            <InputNumber min={0} />
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Systolic(mmHg)</span>
                                                        <span style={{ marginRight: 15, marginLeft: 15 }}></span>
                                                        <Form.Item name="dis_pressure" noStyle>
                                                            <InputNumber min={0} />
                                                        </Form.Item>
                                                        <span className="ant-form-text"> Diastolic(mmHg)</span>
                                                    </Form.Item>
                                                    <Form.Item name='remarks' label="Special Remarks(Optional)">
                                                        <Input.TextArea />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="visitedStatus"
                                                        label="Previously Visited ?"
                                                        rules={[{ required: true, message: 'Please pick an option!' }]}
                                                    >
                                                        <Radio.Group>
                                                            <Radio value="1">Yes</Radio>
                                                            <Radio value="0">No</Radio>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Row>
                                                        <Col span={16} style={{ textAlign: 'center' }}>
                                                            <Button type="primary" htmlType="submit">
                                                                Submit
                                                            </Button>
                                                            <Button style={{ marginLeft:15 }} onClick={this.savePrescription}>
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
                                    <PatientCard patientName={this.state.patientName} age={this.state.patientage} doctorName = {this.state.appointment.doctor.fullName} time={this.state.appointment.appointmentTimeSlot}/>
                                </Col>
                            </Row>

                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
