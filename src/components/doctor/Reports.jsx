import React, { Component } from 'react';
import { Table, Tag, Space, Select, Form } from 'antd';
import { Typography } from 'antd';

const { Text, Link } = Typography;

const { Option } = Select
const columns = [
    {
        title: 'Report Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Format',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {

            return(
                (
                        <Text type='danger' strong style={{color:'black'}}>.{String(text).split('.').pop()}</Text>
                )
            )
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a href={record.url}>Download</a>
                <a>Show Online</a>
            </Space>
        ),
    },
];


const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPats: [],
            reports : []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8090/doctorA/get/patients', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ allPats: data })
        })
    }

    onChange = (id) =>{
       
        let filId = ''
        this.state.allPats.filter(item => item.fullName === id).map(fillItem =>{
            
            console.log(fillItem._id);
            filId = fillItem._id
        })
        let url = 'http://localhost:8090/reports/get/report/' + filId;

        console.log(url);
        fetch('http://localhost:8090/reports/get/report/' + filId, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log("reports" + data);
            this.setState({ reports: data })
        })
    }
    render() {
        return (
            <div>
                
                    <Form.Item
                    label="Select the User Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Select
                        style={{ width: 200 }}
                        showSearch
                        placeholder="Select a person"
                        onChange={this.onChange}
                    >
                        {this.state.allPats.map(item => {
                            return (

                                <Option value={item.fullName}>{item.fullName}</Option>
                            )
                        })}
                    </Select>
                    </Form.Item>
                <Table columns={columns} dataSource={this.state.reports} />
            </div>
        );
    }
}

export default Reports;