import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';


const columns = [
    {
        title: 'App ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Patient Name',
        dataIndex: 'pName',
        key: 'pName',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'green' : 'green';
                    if (tag === 'urgent') {
                        color = 'red';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/appointment/" + record.id }>Show Appointment</Link>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#" style={{color:'red'}}>Delete</a>
                </Popconfirm>
            </Space>
        ),
    },
];

function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }
  
  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

const data = [
    {
        id: '1213-3kjn',
        pName: 'John Brown',
        time: '2021-10-10 9:30am',
        tags: ['urgent', 'pending'],
    }
];


class PendingApps extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default PendingApps;