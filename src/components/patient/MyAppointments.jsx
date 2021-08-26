import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import Drawer from './PatientDrawer'

const { Option } = Select;

class MyAppointments extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            appointments:[],
            doctor:[],
            visible: false,
            columns:[]
        }
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };

    fetchAppointments = () =>{
        fetch('http://localhost:8000/appointment/get/'+this.state.patient).then(res => res.json()).then(data =>{
          this.setState({appointments: data, doctor: data.doctor})
        //   console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        this.fetchAppointments()
    }

    render() {

        this.state.columns = [
            {
                title: 'Appointment ID',
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
                title: 'Doctor',
                dataIndex: 'doctor',
                key: 'doctor',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <>
                        <Tag color={"red"}>
                            URGENT
                        </Tag>
                        <Tag color={"green"}>
                            PENDING
                        </Tag>
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        {/* <Link to={"/appointment/" + record._id}>Show Appointment</Link>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#" style={{ color: 'red' }}>Decline</a>
                        </Popconfirm> */}
                        <Button type="primary" onClick={this.showDrawer}>
                            Update
                        </Button>
                    </Space>
                ),
            },
        ];

        // console.log(this.state.appointments)
        // console.log(this.state.doctor)
        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Appointments</h3>
                <Table columns={this.state.columns} dataSource={this.state.appointments}/>

                <Drawer
                    title="Update Your appointment"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={this.onClose} type="primary">
                            Submit
                        </Button>
                        </div>
                    }
                    >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                name="doctor"
                                label="Doctor"
                                rules={[{ required: true, message: 'Please select the docor' }]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item
                                name="url"
                                label="Url"
                                rules={[{ required: true, message: 'Please enter url' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                                </Form.Item>
                            </Col> */}
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                            name="owner"
                            label="Prefered Timeslot"
                            rules={[{ required: true, message: 'Please select an owner' }]}
                        >
                            <Select placeholder="Please select an owner">
                                <Option value="xiao">Xiaoxiao Fu</Option>
                                <Option value="mao">Maomao Zhou</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please choose the type' }]}
                        >
                            <Select placeholder="Please choose the type">
                                <Option value="private">Private</Option>
                                <Option value="public">Public</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="approver"
                            label="Approver"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                        >
                            <Select placeholder="Please choose the approver">
                                <Option value="jack">Jack Ma</Option>
                                <Option value="tom">Tom Liu</Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="dateTime"
                            label="DateTime"
                            rules={[{ required: true, message: 'Please choose the dateTime' }]}
                        >
                            <DatePicker.RangePicker
                                style={{ width: '100%' }}
                                getPopupContainer={trigger => trigger.parentElement}
                            />
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                required: true,
                                message: 'please enter url description',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default MyAppointments
