import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker , Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
// import Drawer from './PatientDrawer'
import { Typography } from 'antd';
import Logo from './../../assets/img/outlined logo.png'
import JsPDF from 'jspdf';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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
            visibleModal:false,
            columns:[],
            record:{},
            selectedAppointment:{},
            printAppointment:{},
            doctors:[],
            timeslots:[],
            selectedDoctor:'',
            preferedDate: '',
            preferedTimeSlot: '',
            patientMeaasage:'',
        }
    }

    showModal = (record) => {
        
        console.log(record.appointmentId)
        this.setState({
            visibleModal : true,
            printAppointment : record
        });
    };

    handleOk = () => {
        this.setState({
            visibleModal : false
        });
    };
    
    handleCancel = () => {
        this.setState({
            visibleModal : false
        });
    };

    generatePDF = () => {

        const report = new JsPDF('portrait', 'pt', 'a3');
        report.html(document.querySelector('#appointmentReciept')).then(() => {
            report.save('reciept.pdf');
        });
    }

    showDrawer = (record1) => {
        this.forceUpdate()
        console.log(record1.appointmentId)

        this.state.appointments
            .filter((item) => item.appointmentId === record1.appointmentId)
            .map((filterdItem) => this.setState({ selectedAppointment: filterdItem })); 

        this.setState({
            visible: true
        });
    };
    
    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    onSelectDoctor = (value) => {
        console.log(`selected ${value}`);
        this.setState({selectedDoctor : value})
        this.fetchTimeSlots(value)
        // console.log(this.state.patient)
    }

    onSelectTimeslot = (value) => {
        console.log(`selected ${value}`);
        this.setState({preferedTimeSlot : value})
    }

    onDateChange = (dateString) => {
        this.setState({preferedDate : dateString})
        console.log(dateString);
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
        console.log({[e.target.name]:e.target.value})
    }

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
        this.fetchDoctors()
    }

    fetchTimeSlots = (id) => {
        console.log('docid = ',id)
        fetch('http://localhost:8090/doctorA/get-timeslots/'+id).then(res => res.json()).then(data =>{
            this.setState({timeslots : data.timeSlots})
            console.log(data.timeSlots)
          }).catch(err =>{
            console.log(err);
          })
    }

    fetchDoctors = () =>{
        fetch('http://localhost:8090/doctorA/get-my-name').then(res => res.json()).then(data =>{
          this.setState({doctors : data})
        //   console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }


    onDelete = (id) =>{
        console.log(id);
        fetch('http://localhost:8090/appointment/delete/'+id).then((res) => {
            if (res.status === 200){
                // alert('Appointment Removed');
                // history.push('');
                message.success('Appointment Deleted!');
                window.location.replace("/patient")
            }
            else{
                alert('Something Went Wrong!')
            }
        })
    }

    handleSubmit = (id) => {

        console.log(id);
        if(this.state.selectedDoctor === ''){
            
            this.setState({selectedDoctor : this.state.selectedAppointment.doctorID})
            
        }
        console.log("assigned "+this.state.selectedDoctor);
        const data = {
            patientMessage: this.state.patientMeaasage,
            appointmentDate: this.state.selectedAppointment.appointmentDate,
            appointmentTimeSlot: this.state.selectedAppointment.appointmentTimeSlot,
            doctor: this.state.selectedAppointment.doctorID,
            patient: this.state.patient
        }
        console.log(data);
    
        fetch('http://localhost:8090/appointment/update/'+id,{
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        }).then(res => res.json()).then(data =>{
            console.log(data.message)
  
            if(data.message === 'ok'){
                this.onClose()
                message.success('Appointment Updated Successfully!');
                window.location.replace("/patient")
            }
                
        }).catch(err =>{
                console.log(err)
        })
    }

    render() {

        // const record2 = this.state.record;
        // console.log(record2)
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
                title: 'Reciept',
                dataIndex: 'appointmentStatus',
                key: 'appointmentStatus',
                render: (appointmentStatus, record) => (
                    <>
                        {
                            appointmentStatus.map(item => {
                                let status = item == "true" ? '' : 'disable'
                                return(
                                    // <Tag color={color}>
                                    //     {status.toUpperCase()}
                                    // </Tag>
                                    <Button disabled={status} onClick={()=> this.showModal(record)}>
                                        Print Reciept
                                    </Button>
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
                            title="Are you sure you want to delete this appointment?"
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


                <Modal title={'Appointment : '+this.state.printAppointment.appointmentId} visible={this.state.visibleModal} onOk={this.generatePDF} onCancel={this.handleCancel}>

                    <div id="appointmentReciept">
                        <img src={Logo} alt="" width="150px" style={{ marginLeft:"150px", marginBottom:"10px"}}/>
                        <Title level={4} style={{ marginLeft:"125px", marginBottom:"30px"}}>Appointment Receipt</Title>
                        <hr />
                        <div style={{display:'flex', textAlign:'center', marginLeft:"40px"}}>
                            <div>
                                <Title level={5}>Appointment ID</Title>
                                <p>{this.state.printAppointment.appointmentId}</p>
                            </div>
                            <div style={{ marginLeft:"25px"}}>
                                <Title level={5}>Appointment Date</Title>
                                <p>{this.state.printAppointment.appointmentDate}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', textAlign:'center', marginLeft:"55px"}}>
                            <div>
                                <Title level={5}>Appointment Time Slot</Title>
                                <p>{this.state.printAppointment.appointmentTimeSlot}</p>
                            </div>
                            <div style={{ marginLeft:"30px"}}>
                                <Title level={5}>Doctor</Title>
                                <p>{this.state.printAppointment.doctor}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft:"30px", marginRight:"20px", textAlign:'center'}}>
                            <Title level={5}>Instructions</Title>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Nisi ipsam corrupti voluptatibus ut itaque modi ullam in reprehenderit, 
                                quaerat corporis ea nesciunt natus dolor voluptates, 
                                asperiores aspernatur harum ducimus quibusdam.</p>
                        </div>
                        
                    </div>

                </Modal>

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
                        <Button onClick={()=>this.handleSubmit(this.state.selectedAppointment.appointmentId)} type="primary">
                            Submit
                        </Button>
                        </div>
                    }
                    >
                        
                        <Form
                            style={{marginLeft:"10%", marginTop:"5%", width:"90%", textAlign:"center"}}
                            labelCol={{
                            span: 8,
                            }}
                            wrapperCol={{
                            span: 14,
                            }}
                            layout="horizontal"
                            initialValues={{
                            size: this.state.componentSize,
                            }}
                            size={this.state.componentSize}
                        >
                            
                            <Form.Item 
                            label="Doctor"
                            rules={[
                                {
                                required: true,
                                message: 'Please select the doctor!',
                                },
                            ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Select your doctor"
                                    optionFilterProp="children"
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    placeholder="Select your doctor"
                                    onChange={this.onSelectDoctor}
                                    defaultValue={this.state.selectedAppointment.doctor}
                                >
                                    {this.state.doctors.map(item =>{
                                        return(<Select.Option value={item._id}>{item.fullName}</Select.Option>)
                                    })}
                                </Select>

                            </Form.Item>

                            <Form.Item 
                                label="Prefered time slot"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please select your Prefered time slot!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select your Prefered time slot!"
                                    onChange={this.onSelectTimeslot}
                                    defaultValue={this.state.selectedAppointment.appointmentTimeSlot}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.timeslots.map(item =>{
                                        return(<Select.Option value={item.timeSlot}>{item.timeSlot}</Select.Option>)
                                    })}   
                                </Select>
                            </Form.Item>

                            <Form.Item 
                                label="Prefered Date"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your prefered date!',
                                    },
                                ]}
                                >
                                <DatePicker name="preferedDate" onChange={this.onDateChange}/>
                            </Form.Item>

                            <Form.Item 
                                label="Message"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your message to the doctor',
                                    },
                                ]}
                                >
                                <TextArea rows={4} name="patientMeaasage" onChange={this.handleChange} defaultValue={this.state.selectedAppointment.appointmentMsg} placeholder="Please input your message to the doctor (Your condition)"/>
                            </Form.Item>

                            {/* <Form.Item label="">
                                <Button type="primary" htmlType="submit"  style={{width:"100%", marginLeft:"60%"}}>Create Appointment</Button>
                            </Form.Item> */}
                        </Form>
                </Drawer>
            </div>
        )
    }
}

export default MyAppointments
