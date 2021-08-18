import React, { Component } from 'react'
import { Row, Col, Layout, Typography, Menu, Table, Tag, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import '../../../assets/css/mahen_general.css';

const { Title, Text } = Typography;
const { Content } = Layout;


export default class CompleteCollectionListComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
        }

    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Doctor',
                dataIndex: 'doctor',
                key: 'doctor',
                ...this.getColumnSearchProps('doctor'),
            },
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
                ...this.getColumnSearchProps('time'),
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <>
                        {(status => {
                            let color = 'black';
                            if (status === 'New') {
                                color = 'volcano';
                            }
                            else if (status === 'Sample Collected') {
                                color = 'geekblue';
                            }
                            else if (status === 'Closed') {
                                color = 'green';
                            }
                            return (
                                // <p style={{color:'green'}}>{state.toUpperCase()}</p>
                                <Tag color={color} key={status}>
                                    {status.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
                ...this.getColumnSearchProps('status'),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Tag color={'green'}>
                            <a>Create Test Request</a>
                        </Tag>
                        <Tag color={'geekblue'}>
                            <a>Edit Test Request</a>
                        </Tag>
                        <Tag color={'green'}>
                            <a>Send Test Request</a>
                        </Tag>
                    </div>

                ),
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                doctor: 'Mark Wood',
                time: '19:20:00',
                status: 'Closed',
            },
            {
                key: '2',
                name: 'Jim Green',
                doctor: 'Mark Wood',
                time: '19:30:00',
                status: 'Sample Collected',
            },
            {
                key: '3',
                name: 'Joe Black',
                doctor: 'Mark Wood',
                time: '19:40:00',
                status: 'New',
            },
        ];


        return (
            <div>
                <div>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 16,
                        }}
                    >
                        <Row justify='start'>
                            <Title level={3}>Complete Appointment List : 03/10/2021</Title>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />
                            </Col>
                        </Row>
                    </Content>
                </div>
            </div>
        )
    }
}
