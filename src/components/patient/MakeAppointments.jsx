import React, { Component } from 'react'

import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,

} from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

class MakeAppointments extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            doctors:[],
            timeslots:[],
            preferedDate: '',
            preferedTimeSlot: '',
            selectedDoctor:'',
            patientMeaasage:'',

        }
    }
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

    fetchTimeSlots = (id) => {
        console.log('docid = ',id)
        fetch('http://localhost:8090/doctorA/get-timeslots/'+id).then(res => res.json()).then(data =>{
            this.setState({timeslots : data.timeSlots})
            // console.log(data.timeSlots)
          }).catch(err =>{
            console.log(err);
          })
    }

    fetchDoctors = () =>{
        fetch('http://localhost:8090/doctorA/get-my-name').then(res => res.json()).then(data =>{
          this.setState({doctors : data})
          console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }
    
    componentDidMount(){
        this.fetchDoctors()
    }


    handleSubmit = () => {

        const data = {
            patientMessage: this.state.patientMeaasage,
            appointmentDate: this.state.preferedDate,
            appointmentTimeSlot: this.state.preferedTimeSlot,
            doctor: this.state.selectedDoctor,
            patient: this.state.patient
        }
        console.log(data);
    
        fetch('http://localhost:8090/appointment/create',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        }).then(res => res.json()).then(data =>{
            console.log(data.message)
  
            if(data.message === 'ok'){

                // window.localStorage.setItem('token',data.token)
                // window.localStorage.setItem('id',data.id)
                window.location.replace("/patient")
            }
                
        }).catch(err =>{
                console.log(err)
        })
    }

    render() {
        const onFormLayoutChange = ({ size }) => {
            this.state.setComponentSize(size);
          };
    
        // const onFinish = (values) => {
        //   console.log('Success:', values);
        // };
      
        // const onFinishFailed = (errorInfo) => {
        //   console.log('Failed:', errorInfo);
        // };

        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>Create Appointment</h3>

                <Form
                    style={{marginLeft:"10%", marginTop:"5%", width:"90%", textAlign:"center"}}
                    labelCol={{
                    span: 6,
                    }}
                    wrapperCol={{
                    span: 10,
                    }}
                    layout="horizontal"
                    initialValues={{
                    size: this.state.componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
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
                        >
                            {this.state.doctors.map(item =>{
                                return(<Select.Option value={item._id}>{item.fullName}</Select.Option>)
                            })}
                            {/* <Select.Option value="Dr">Dr</Select.Option>
                            <Select.Option value="Mr">Mr</Select.Option>
                            <Select.Option value="Mrs">Mrs</Select.Option> */}
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
                            {/* <Select.Option value="1">4.00pm - 5.00pm</Select.Option>
                            <Select.Option value="2">4.00pm - 5.00pm</Select.Option>
                            <Select.Option value="3">4.00pm - 5.00pm</Select.Option> */}
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
                        <DatePicker name="preferedDate" onChange={this.onDateChange} format={dateFormat}/>
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
                        <TextArea rows={4} name="patientMeaasage" onChange={this.handleChange} placeholder="Please input your message to the doctor (Your condition)"/>
                    </Form.Item>

                    <Form.Item label="">
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:"100%", marginLeft:"60%"}}>Create Appointment</Button>
                    </Form.Item>
                </Form>

            </div>

        )
    }
}

export default MakeAppointments