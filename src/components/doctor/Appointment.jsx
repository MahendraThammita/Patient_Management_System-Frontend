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
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Radio } from 'antd';

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
    { label: 'Open', value: 'Open' },
    { label: 'On Progress', value: 'On Progress' },
    { label: 'Closed', value: 'Closed' },
];

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};



class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loadings: [],
            value2 : 'Open'
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ id: id })
    }

    onChange2 = e => {
        console.log('radio2 checked', e.target.value);
        this.setState({
            value2: e.target.value,
        });
    };

    enterLoading = index => {
        this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = true;

            return {
                loadings: newLoadings,
            };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 6000);
    };
    render() {
        const { collapsed } = this.state;
        const { loadings } = this.state;
        const { value2} = this.state;
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

                            <Button type="primary" block>Issue Prescription</Button>
                            <br />
                            <br />
                            <Row>
                                <Col span={6} >
                                    <Card title="Patient Info" bordered={false}>
                                        <Row>
                                            <Col span={7}>
                                                <Avatar size={70}>U</Avatar>
                                            </Col>
                                            <Col span={10} >
                                                <Title level={4}>Mr Test</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Row>
                                            <Col span={10}>
                                                <Title level={4}>Date</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                            </Col>
                                            <Col span={10} >
                                                <Title level={4}>Time</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Row>
                                            <Col span={11} style={{ backgroundColor: 'white' }}>
                                                <Title level={4}>Address</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Liyanage bake house</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Pambainna</Title>
                                                <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Belihuloys</Title>
                                            </Col>
                                            <Col span={13} >
                                                <Button
                                                    type="primary"
                                                    danger
                                                    size="large"
                                                    block
                                                    icon={<RightOutlined />}
                                                    loading={loadings[1]}
                                                    onClick={() => this.enterLoading(1)}
                                                >
                                                    Decline Appointment
                                                </Button>

                                                <Button
                                                    style={{ marginTop: '10px' }}
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    icon={<RightOutlined />}
                                                    loading={loadings[1]}
                                                    onClick={() => this.enterLoading(1)}
                                                >
                                                    Reschedule
                                                </Button>

                                            </Col>
                                        </Row>
                                    </Card>
                                    <br />
                                    <Card title="Current Medications" bordered={false}>
                                        <Title level={5} style={{ lineHeight: '1px' }}>Time</Title>
                                        <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                        <hr />

                                        <Title level={5} style={{ lineHeight: '1px' }}>Time</Title>
                                        <Title level={5} type="secondary" style={{ lineHeight: '1px' }}>Active since 2020</Title>
                                    </Card>
                                </Col>
                                <Col span={1}>
                                </Col>
                                <Col span={17}>
                                    <Card title="Recent Activity" bordered={false}>
                                        <Comment
                                            author={<a>Han Solo</a>}
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={
                                                <p>
                                                    We supply a series of design principles, practical patterns and high quality design
                                                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                                                    and efficiently.
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{moment().fromNow()}</span>
                                                </Tooltip>
                                            }
                                        />
                                    </Card>
                                    <br />
                                    <Card title="Attachments" bordered={false}>
                                        <Row>
                                            <Col span={12}>
                                                <List
                                                    size="small"
                                                    bordered
                                                    dataSource={data}
                                                    renderItem={item => <List.Item>{item} <br /> <Button type="primary">Donwload</Button> </List.Item>}
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