import React, { Component } from 'react'
import { Form, Input, Select, Radio, Button, Tooltip, AutoComplete, Row, Col, Image, Layout, Typography, Dropdown, Menu, Badge, Avatar, message } from 'antd';
import { TabletFilled, HomeFilled, BellOutlined, DownOutlined, LogoutOutlined, MinusOutlined, DashboardOutlined, PlusOutlined, CarryOutFilled, EditFilled, CopyFilled, SkinFilled, ReconciliationFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import WelcomeSection from '../DashboardCommon/WelcomeSection'
import OverviewCard from '../DashboardCommon/OverviewCard'
import Logo from '../../../assets/img/pmslogo.png'

const { Option } = Select;
const { Title, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class ConductTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: Form,
            testOption: 'New',
            testCategoryObjectsArray: [{ Item: "", ItemValue: "", Remark: "" }]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    // handle input change
    handleInputChange = (e, index) => {
        let id = '';
        let value = '';
        if(typeof(e.target) === 'undefined'){
            id = 'Remark';
            value = e;
        }
        else{
            id = e.target.id;
            value = e.target.value;
        }
        
        let list = [...this.state.testCategoryObjectsArray];
        list[index][id] = value;
        this.setState({ testCategoryObjectsArray: list });
    };

    // handle click event of the Remove button
    handleRemoveClick = index => {
        const list = [...this.state.testCategoryObjectsArray];
        list.splice(index, 1);
        this.setState({ testCategoryObjectsArray: list });
    };

    // handle click event of the Add button
    handleAddClick = () => {
        let tempList = this.state.testCategoryObjectsArray;
        tempList.push({ Item: "", ItemValue: "", Remark: "" })
        this.setState({testCategoryObjectsArray:tempList});
    };

    render() {
        const testoptions = [
            { label: 'New', value: 'New' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Completed', value: 'Completed' },
        ];
        const menu = (
            <Menu onClick={this.onDropdownMenuClick}>
                <Menu.Item key="1" icon={<LogoutOutlined />}>Log Out</Menu.Item>
            </Menu>
        );
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
                                    <DashboardOutlined style={{ marginTop: 5, marginRight: 10 }} /><Text strong>Lab Staff Dashboard</Text>
                                </Row>

                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1" icon={<HomeFilled />}>
                                    Home
                                </Menu.Item>
                                <Menu.Item key="2" icon={<TabletFilled />}>
                                    Tests
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
                                            padding: 24,
                                            margin: 16,
                                        }}
                                    >
                                        <Row style={{ paddingTop: 10 }}>
                                            <Title level={3}>Request Details</Title>
                                        </Row>
                                        <Row style={{ paddingTop: 20 }}>
                                            <Col span={8}>
                                                <Row>
                                                    <Col span={4}>
                                                        <CopyFilled
                                                            style={{ fontSize: '48px', color: '#08c' }}
                                                        />
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row>
                                                            <Title level={3}>Report Type</Title>
                                                        </Row>
                                                        <Row style={{ paddingTop: 0 }}>
                                                            <Col span={3}></Col>
                                                            <Text strong type="secondary" style={{ fontSize: '16px' }}>Fasting Blood Sugar</Text>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </Col>
                                            <Col span={8}>
                                                <Row>
                                                    <Col span={4}>
                                                        <SkinFilled
                                                            style={{ fontSize: '48px', color: '#08c' }}
                                                        />
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row>
                                                            <Title level={3}>Patient Name</Title>
                                                        </Row>
                                                        <Row style={{ paddingTop: 0 }}>
                                                            <Col span={3}></Col>
                                                            <Text strong type="secondary" style={{ fontSize: '16px' }}>Fasting Blood Sugar</Text>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </Col>
                                            <Col span={8}>
                                                <Row>
                                                    <Col span={4}>
                                                        <ReconciliationFilled
                                                            style={{ fontSize: '48px', color: '#08c' }}
                                                        />
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row>
                                                            <Title level={3}>Speciman No</Title>
                                                        </Row>
                                                        <Row style={{ paddingTop: 0 }}>
                                                            <Col span={3}></Col>
                                                            <Text strong type="secondary" style={{ fontSize: '16px' }}>Fasting Blood Sugar</Text>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: 40, paddingBottom: 30 }}>
                                            <Col span={8}>
                                                <Row>
                                                    <Col span={4}>
                                                        <EditFilled
                                                            style={{ fontSize: '48px', color: '#08c' }}
                                                        />
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row>
                                                            <Title level={3}>Referred By</Title>
                                                        </Row>
                                                        <Row style={{ paddingTop: 0 }}>
                                                            <Col span={3}></Col>
                                                            <Text strong type="secondary" style={{ fontSize: '16px' }}>Fasting Blood Sugar</Text>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </Col>
                                            <Col span={8}>
                                                <Row>
                                                    <Col span={4}>
                                                        <CarryOutFilled
                                                            style={{ fontSize: '48px', color: '#08c' }}
                                                        />
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row>
                                                            <Title level={3}>Age</Title>
                                                        </Row>
                                                        <Row style={{ paddingTop: 0 }}>
                                                            <Col span={3}></Col>
                                                            <Text strong type="secondary" style={{ fontSize: '16px' }}>Fasting Blood Sugar</Text>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </Col>
                                        </Row>

                                    </Content>
                                </Col>
                                <Col span={6}>
                                    <OverviewCard />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={18}>
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            padding: 24,
                                            margin: 16,
                                        }}
                                    >
                                        <Row style={{ paddingTop: 10 }}>
                                            <Title level={3}>Request Details</Title>
                                        </Row>
                                        <Row style={{ paddingTop: 20 }}>
                                            <Col span={8}>
                                                <Title level={5}>Item/Category</Title>
                                            </Col>
                                            <Col span={8}>
                                                <Title level={5}>Result(Range/Value)</Title>
                                            </Col>
                                            <Col span={8}>
                                                <Title level={5}>Remarks</Title>
                                            </Col>
                                        </Row>
                                        {this.state.testCategoryObjectsArray.map((x, i) => {
                                            return (
                                                <Row style={{ paddingTop: 20 }}>
                                                    <Col span={8}>
                                                        <Row>
                                                            <Col span={20}>
                                                                <Form.Item
                                                                    name='Item'
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                        },
                                                                    ]}
                                                                    onChange={e => this.handleInputChange(e, i)}
                                                                >
                                                                    <AutoComplete placeholder="Item/Category">
                                                                        <Input />
                                                                    </AutoComplete>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Row>
                                                            <Col span={20}>
                                                                <Form.Item
                                                                    name='ItemValue'
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                        },
                                                                    ]}
                                                                    onChange={e => this.handleInputChange(e, i)}
                                                                >
                                                                    <AutoComplete placeholder="Item/Category">
                                                                        <Input />
                                                                    </AutoComplete>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={4}>
                                                        <Row>
                                                            <Col span={20}>
                                                                <Form.Item
                                                                    name="Remark1"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Please Add remark',
                                                                        },
                                                                    ]}
                                                                    
                                                                >
                                                                    <Select defaultValue="Remarks" id="Remark" onChange={(e) => this.handleInputChange(e, i)}>
                                                                        <Option value="High">High</Option>
                                                                        <Option value="Normal">Normal</Option>
                                                                        <Option value="Low" >Low</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={4}>
                                                        {this.state.testCategoryObjectsArray.length !== 1 &&
                                                            <Tooltip title="Remove Item" style={{ marginRight: 10 }}>
                                                                <Button type="danger" style={{ marginRight: 10 }} icon={<MinusOutlined style={{ fontSize: '28px' }} />} size="medium" onClick={() =>this.handleRemoveClick(i)}/>
                                                            </Tooltip>
                                                        }
                                                        {this.state.testCategoryObjectsArray.length - 1 === i &&
                                                            <Tooltip title="Add Item">
                                                                <Button type="primary" icon={<PlusOutlined style={{ fontSize: '28px', marginBottom: 15 }} />} size="medium" onClick={this.handleAddClick}/>
                                                            </Tooltip>
                                                        }

                                                    </Col>
                                                </Row>
                                            )
                                        })}

                                        <Row>
                                            <Form.Item name={['user', 'SpecialRemarks']} label="Special Remarks(Optional) : ">
                                                <Input.TextArea style={{ width: 540 }} />
                                            </Form.Item>
                                        </Row>
                                        <Row>
                                            <Col span={5}></Col>
                                            <Radio.Group
                                                options={testoptions}
                                                onChange={this.onStatusChange}
                                                value={this.state.testOption}
                                                optionType="button"
                                            />
                                        </Row>
                                        <Row style={{ marginTop: 20, marginBottom: 20 }}>
                                            <Col span={12}></Col>
                                            <Button style={{ marginLeft: 10, marginRight: 10 }} type="primary" size='large'>Save</Button>
                                            <Button style={{ marginLeft: 10, marginRight: 10 }} size='large'>Submit</Button>
                                            <Button style={{ marginLeft: 10, marginRight: 10 }} size='large'>Publish</Button>
                                        </Row>

                                    </Content>
                                </Col>
                                <Col span={6}>

                                </Col>
                            </Row>


                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
