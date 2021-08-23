import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';


const columns = [
    {
        title: 'App ID',
        dataIndex: '_id',
        key: '_id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Appointment Date',
        dataIndex: 'appointmentDate',
        key: 'appointmentDate',
    },
    {
        title: 'Time',
        dataIndex: 'appointmentTimeSlot',
        key: 'appointmentTimeSlot',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                <Tag color={"blue"}>
                    NO
                </Tag>
                <Tag color={"orange"}>
                    DECLINED
                </Tag>
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/appointment/" + record._id}>Show Appointment</Link>
                <Popconfirm
                    title="Are you sure to do this action?"
                    onConfirm={() => confirm(record._id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#" style={{ color: 'red' }}>Set as Pending</a>
                </Popconfirm>
            </Space>
        ),
    },
];

let appId;

function confirm(e) {
    console.log(e);

    fetch("http://localhost:8000/doctorA/status/" + e, {
        method: "POST",
        headers: {
            'Content-type': 'Application/json',
            Authorization: "Bearer " + window.localStorage.getItem('token')
        },
        body: JSON.stringify({status : "pending"})
    }).then(res => res.json()).then(data => {
        message.success('Appointment status set to PENDING successfully!');

        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }).catch(err =>{
        console.log(err);
    })
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






class DecApps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        //fetch pending appointments
        fetch("http://localhost:8000/doctorA/declined/" + window.localStorage.getItem('user_id'), {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ data })
        })
    }
    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} />
        );
    }
}

export default DecApps;