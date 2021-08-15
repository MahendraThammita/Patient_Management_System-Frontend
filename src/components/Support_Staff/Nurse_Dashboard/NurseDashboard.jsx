import React, { Component } from 'react'
import { Form, Row, Col, Button, Layout, Typography, Divider, Menu, Breadcrumb, Avatar } from 'antd';
import { UserOutlined, NotificationOutlined, LaptopOutlined, SnippetsOutlined, CarryOutOutlined, ExperimentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Pie } from '@ant-design/charts';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import SummerySection from '../DashboardCommon/SummerySection'

const { Title, Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class NurseDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form
        }
    }


    render() {
        var data = [
            {
              type: 'Compleated',
              value: 27,
            },
            {
              type: 'To be Compleated',
              value: 25,
            },
          ];
        var config = {
            appendPadding: 0,
            data: data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.7,
            legend: false,
            label: {
              type:'inner',
              offset: '-50%',
              content: '{value}',
              style: {
                textAlign: 'center',
                fontSize: 10,
              },
            },
            interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
            statistic: {
              title: false,
              content: {
                style: {
                  whiteSpace: 'pre-wrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: 24,
                },
                content: '28%',
              },
            },
          };
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo" />

                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <WelcomeSection />
                            <Row>
                                <Col span={6}>
                                    <SummerySection />
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col span={8}>
                                            <Content
                                                className="site-layout-background"
                                                style={{
                                                    paddingLeft: 24,
                                                    paddingRight:24,
                                                    paddingTop:0,
                                                    margin: 16,
                                                }}
                                            >
                                                <Pie {...config} />
                                                <Title level={3} type="secondary">Appontment</Title>
                                            </Content>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Layout>
                    </Layout>
                </Layout>,
            </div>
        )
    }
}
