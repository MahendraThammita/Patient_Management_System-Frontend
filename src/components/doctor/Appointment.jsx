import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Row, Col } from 'antd';
import SiteFooter from '../Footer/SiteFooter';
import DashPHeader from '../PageHeader/DashPHeader';
import { Form, Input, Checkbox } from 'antd';
import { List, Divider } from 'antd';

import { Statistic, Card, Tabs, } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PendingApps from './PendingApps';
import FinApps from './FinApps';
import DecApps from './DecApps';
import { useParams, withRouter } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';
import { RightOutlined } from '@ant-design/icons';

import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,FileDoneOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import Prescription from './Prescription';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Title } = Typography;
const { Dragger } = Upload;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const options = [
    { label: 'Pending', value: 'pending' },
    { label: 'Finished', value: 'finished' },
];

var appid;

const props = {
    name: 'files',
    action: 'http://localhost:8090/upload',
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log(info.file.response)
            //window.localStorage.setItem('proImg',info.file.response.Location)

            const data = {
                report: {
                    url: info.file.response.url,
                    name: info.file.response.filename
                }
            }

            fetch("http://localhost:8090/doctorA/report/" + appid, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: "Bearer " + window.localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => {
                console.log(data);
                window.location.reload()
            }).catch(err => {
                console.log(err);
            })

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loadings: [],
            value2: 'Open',
            data: {},
            patient: {},
            name: '',
            freq: '',
            meds: [],
            reports: [],
            selItem : '',
            ui : ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        appid = this.props.match.params.id;
        this.setState({ id: id })

        //fetch the appointment data
        fetch("http://localhost:8090/doctorA/" + this.props.match.params.id, {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ data, patient: data.patient, meds: data.patient.medications, reports: data.reports })
        }).catch(err => {
            console.log(err);
        })
    }

    changeStatus = (status) =>{

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

        const data = {
            status : status
        }
        fetch("http://localhost:8090/doctorA/status/" + this.props.match.params.id, {
            method: "POST",
            headers: {
                'Content-type': 'Application/json',
                Authorization: "Bearer " + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err =>{
            console.log(err);
        })
    }

    onChange2 = e => {
        console.log('radio2 checked', e.target.value);
        this.setState({
            value2: e.target.value,
        });

        this.changeStatus(e.target.value)
    };

    enterLoading = index => {
        
    };

    addMedication = () => {
        const data = {
            newMed: {
                medi: this.state.name,
                freq: this.state.freq
            }
        }

        fetch("http://localhost:8090/doctorA/medi/" + this.state.patient._id, {
            method: "PATCH",
            headers: {
                'Content-type': 'Application/json',
                Authorization: "Bearer " + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 201) {
                window.location.reload()
            }
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onclose = () =>{
        console.log('close called');
        this.setState({selItem : ''})
    }
    render() {
        const { collapsed } = this.state;
        const { loadings } = this.state;
        const { value2 } = this.state;
        var patient = String(this.state.patient.fullName).slice(0, 2).toUpperCase();
        var meds = Array(this.state.patient.medications)
        let component;

        if(this.state.selItem === 'pres'){
            component = <Prescription onclose={this.onclose} patient={this.state.patient}/>
        }
        //meds = meds[0]
        console.log(this.state.meds);
        return (
            <Layout style={{ minHeight: '100vh', fontStyle: 'initial', fontWeight: 'bold' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Appointments
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <DashPHeader />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Doctor</Breadcrumb.Item>
                            <Breadcrumb.Item>Appointment</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.id}</Breadcrumb.Item>
                        </Breadcrumb>


                        <div style={{ padding: 24, minHeight: 360 }}>
                            <Title level={3}>Appointment AP-{this.state.id}</Title>
                            <Radio.Group
                                options={options}
                                onChange={this.onChange2}
                                value={value2}
                                optionType="button"
                            />
                            <br />
                            <br />

                            <Button type="primary" block onClick={() => {this.setState({selItem : 'pres'})}}>Issue Prescription</Button>
                            {component}
                            <br />
                            <br />
                            <Row>
                                <Col span={6} >
                                    <Card title="Patient Info" bordered={false}>
                                        <Row>
                                            <Col span={7}>
                                                <Avatar size={70}>{patient}</Avatar>
                                            </Col>
                                            <Col span={10} >
                                                <Title level={4}>{this.state.patient.fullName}</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Row>
                                            <Col span={10}>
                                                <Title level={4}>Date</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>{this.state.data.appointmentDate}</Title>
                                            </Col>
                                            <Col span={10} >
                                                <Title level={4}>Time</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>{this.state.data.appointmentTimeSlot}</Title>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Row>
                                            <Col span={11} style={{ backgroundColor: 'white' }}>
                                                <Title level={4}>Address</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>{this.state.patient.addressLine1}</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>{this.state.patient.addressLine2}</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>{this.state.patient.city}</Title>
                                            </Col>
                                            <Col span={13} >
                                                <Button
                                                    type="primary"
                                                    danger
                                                    size="large"
                                                    block
                                                    icon={<RightOutlined />}
                                                    loading={loadings[1]}
                                                    onClick={() => this.changeStatus('declined')}
                                                >
                                                    Decline Appointment
                                                </Button>

                                                <Button
                                                    style={{ marginTop: '10px' }}
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    icon={<RightOutlined />}

                                                >
                                                    Reschedule
                                                </Button>

                                            </Col>
                                        </Row>
                                    </Card>
                                    <br />
                                    <Card title="Current Medications" bordered={false} >

                                        {this.state.meds.map(item => {
                                            return (
                                                <div>
                                                    <Title level={5} style={{ lineHeight: '1px' }}>{"Medication : " + item.medi}</Title>
                                                    <Title level={5} type="secondary" style={{ lineHeight: '2px' }}>{"Frequency : " + item.freq}</Title>
                                                    <hr />
                                                </div>
                                            )
                                        })}

                                        <Form.Item
                                            label="Add new Item"
                                            name="medi"
                                            rules={[{ required: true, message: 'Please input new medication!' }]}
                                        >
                                            <Input name="name" onChange={this.handleChange} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Frequency"
                                            name="medi"
                                            rules={[{ required: true, message: 'Please input new medication!' }]}
                                        >
                                            <Input name="freq" onChange={this.handleChange} />
                                        </Form.Item>
                                        <Button block type="primary" onClick={this.addMedication}>Submit</Button>
                                    </Card>
                                </Col>
                                <Col span={1}>
                                </Col>
                                <Col span={17}>
                                    <Card title="Patient Messages" bordered={false}>
                                        <Comment
                                            author={this.state.patient.fullName}
                                            avatar={
                                                <Avatar size={30}>{patient}</Avatar>
                                            }
                                            content={
                                                <p>
                                                    {this.state.data.patientMessage}
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title={"commented on " + this.state.data.appointmentDate}>
                                                    <span>{this.state.data.appointmentDate}</span>
                                                </Tooltip>
                                            }
                                        />
                                    </Card>
                                    <br />
                                    <Card title="Attachments" bordered={false}>
                                        <Row>
                                            <Col span={12}>
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={this.state.reports}
                                                    renderItem={item => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                avatar={<Avatar icon={<FileDoneOutlined />} size={30} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}/>}
                                                                title={<a href={item.url}>{item.name}</a>}
                                                                //description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            </Col>
                                            <Col span={1} />

                                            <Col span={11}>
                                                <Dragger {...props}>
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                    <p className="ant-upload-hint">
                                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                                        band files
                                                    </p>
                                                </Dragger>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col span={6}>

                                </Col>
                            </Row>

                        </div>
                    </Content>
                    <SiteFooter />
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Appointment);