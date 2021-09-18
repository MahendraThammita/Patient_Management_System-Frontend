import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
// import Drawer from './PatientDrawer'

const { Option } = Select;

function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }
  
  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

class MyAppointments extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            appointments:[],
            doctor:{},
            visible: false,
            columns:[],
            record:{}
        }
    }

    showDrawer = (record1) => {
        this.setState({
          visible: true,
          record:record1
        });
    };
    
    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    fetchAppointments = () =>{
        fetch('http://localhost:8090/appointment/get/'+this.state.patient).then(res => res.json()).then(data =>{
          this.setState({appointments: data, doctor: data.doctor})
          console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        this.fetchAppointments()
    }

    onDelete = (id) =>{
        console.log(id);
        // fetch('http://localhost:8090/appointment/delete/'+id).then((res) => {
        //     if (res.data.status === 200){
        //         // alert('Appointment Removed');
        //         // history.push('');
        //         message.success('Appointment Deleted!');
        //         window.location.replace("/patient")
        //     }
        //     else{
        //         alert('Something Went Wrong!')
        //     }
        // })
    }

    render() {

        this.state.columns = [
            {
                title: 'Appointment ID',
                dataIndex: 'appointmentId',
                key: 'appointmentId',
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
                title: 'Status',
                key: 'appointmentStatus',
                dataIndex: 'appointmentStatus',
                
                render: appointmentStatus => (
                    <>
                        {
                            appointmentStatus.map(item => {
                                let color = item == "true" ? 'green' : 'red'
                                let status = item == "true" ? 'Approved' : 'Pending'
                                return(
                                    <Tag color={color}>
                                        {status.toUpperCase()}
                                    </Tag>
                                )
                            })
                            
                        }
                    </>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'appointmentId',
                key: 'appointmentId',
                render: (text, record) => (
                    <Space size="middle">
                        {/* <Link to={"/appointment/" + record._id}>Show Appointment</Link> */}
                        
                        <Button type="primary" onClick={()=> this.showDrawer(record)}>
                            Update
                        </Button>

                        <Popconfirm
                            title="Are you sure yo want to delete this appointment?"
                            onConfirm={() => this.onDelete(record.appointmentId)}
                            onCancel={cancel}
                            okText="Delete"
                        >
                            <Button type="danger" >
                                Delete
                            </Button>
                        </Popconfirm> 
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
                                <Select placeholder="Please select the docor" defaultValue={this.state.record.doctor}>
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="preferedTimeslot"
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
                            name="dateTime"
                            label="DateTime"
                            rules={[{ required: true, message: 'Please choose the dateTime' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                getPopupContainer={trigger => trigger.parentElement}
                            />
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                            name="message"
                            label="Message"
                            rules={[
                                {
                                required: true,
                                message: 'please enter url description',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="" />
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
