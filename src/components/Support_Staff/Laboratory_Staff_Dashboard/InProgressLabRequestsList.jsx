import React, { Component } from 'react'
import { Row, Col, Layout, Typography, Menu, Table, Tag, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import '../../../assets/css/mahen_general.css';

const { Title, Text } = Typography;
const { Content } = Layout;


export default class InProgressLabRequestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
            Data:{},
            InProgressAppointments:[],
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (testId) =>{
        console.log(testId);
        // localStorage.setItem("selected_labTest",this.props.test._id);
        // window.location.replace('/conduct-test')
    }
    componentDidMount() {
        //fetch appointments
        fetch("http://localhost:8090/tests/caregorizedTests", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem('auth-token')
          }
        }).then(res => res.json()).then(data => {
          console.log(data);
          if (data.message === 'Authentication failed!') {
            window.location.replace('/staff-login')
          }
          this.setState({ Data: data ,
            InProgressAppointments:data.InProgressAppointments})
          console.log("Appointments in parent", this.state.Data)
        })
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
                title: 'Test Id',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'Patient Name',
                dataIndex: 'fullName',
                key: 'fullName',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('fullName'),
            },
            {
                title: 'Patient Age',
                dataIndex: 'age',
                key: 'age',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('age'),
            },
            {
                title: 'Test Name',
                dataIndex: 'testName',
                key: 'testName',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('testName'),
            },
            {
                title: 'Reffered By',
                dataIndex: 'doctor',
                key: 'doctor',
                ...this.getColumnSearchProps('doctor'),
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <>
                        {(status => {
                            let color = 'green';
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
                dataIndex: 'action',
                render: (text, record) => (
                    <div>
                        <Tag color={'geekblue'}>
                            <a onClick={() => {
                                localStorage.setItem("selected_labTest",text);
                                window.location.replace('/edit-tests')
                            }}>Edit Test Report</a>
                        </Tag>
                    </div>

                ),
            },
        ];


        var processedTestList = [];
        this.state.InProgressAppointments.map((item)=>{   
          var testObj = {}
          testObj.id = item._id;
          testObj.fullName = item.patient.fullName;
          testObj.age = item.patient.age;
          testObj.doctor = item.doctor.fullName;
          testObj.testName = item.testName;
          testObj.status = item.status;
          testObj.action = item._id;
          processedTestList.push(testObj);
          console.log('appointment List : ' , processedTestList);
        }); 

        if(processedTestList == []){
            return null;
        }


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
                            <Title level={3}>Tests In Progress</Title>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table columns={columns} dataSource={processedTestList} pagination={{ pageSize: 3 }} />
                            </Col>
                        </Row>
                    </Content>
                </div>
            </div>
        )
    }
}
