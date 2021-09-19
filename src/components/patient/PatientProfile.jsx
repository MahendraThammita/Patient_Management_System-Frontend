import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Statistic, Button } from 'antd';
import { Typography, Space } from 'antd';
import { Drawer, Form, Input, Select, DatePicker, InputNumber } from 'antd';

import { message } from 'antd';

const { Text, Link } = Typography;


class PatientProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            patientObj:{},
            visible: false,
            fullName: '',
            suffix: '',
            age:0,
            dateOfBirth:'',
            profession:'',
            addressLine1:'',
            addressLine2:'',
            city:'',
            phone:'',
            email:'',
            password:'',
            confirmPassword:'',
            guardianName:'',
            guardianPhone:'',
            guardianEmail:'',
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

    fetchPatient = () =>{
        fetch('http://localhost:8090/patient/single/'+this.state.patient).then(res => res.json()).then(data =>{
          this.setState({
            fullName: data.fullName,
            suffix: data.suffix,
            age:data.age,
            dateOfBirth:data.dateOfBirth,
            profession:data.profession,
            addressLine1:data.addressLine1,
            addressLine2:data.addressLine2,
            city:data.city,
            phone:data.phone,
            email:data.email,
            password:data.password,
            guardianName:data.guardianName,
            guardianPhone:data.guardianPhone,
            guardianEmail:data.guardianEmail,
            })
            // console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        this.fetchPatient()
    }

    onSelect = (value) => {
        console.log(`selected ${value}`);
        this.setState({suffix : value})
    }
  
    onNumberChange = (value) => {
        this.setState({age : value})
        console.log('changed', value);
    }
  
    onDateChange = (dateString) => {
        this.setState({dateOfBirth : dateString})
        console.log(dateString);
    }
  
    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
        console.log({[e.target.name]:e.target.value})
    }

    handleSubmit = () => {

        console.log("function called");
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if(!re.test(String(this.state.email).toLowerCase())){
            // message.error("Invalid email address");
            alert("Invalid email address")
        }else{
  
            const data = {
                fullName:this.state.fullName,
                suffix:this.state.suffix,
                age:this.state.age,
                dateOfBirth:this.state.dateOfBirth,
                profession:this.state.profession,
                addressLine1:this.state.addressLine1,
                addressLine2:this.state.addressLine2,
                city:this.state.city,
                phone:this.state.phone,
                email:this.state.email,
                password:this.state.password,
                guardianName:this.state.guardianName,
                guardianPhone:this.state.guardianPhone,
                guardianEmail:this.state.guardianEmail 
            }
            console.log(data);
    
            fetch('http://localhost:8090/patient/update/'+this.state.patient,{
                method : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body : JSON.stringify(data)
            }).then(res => res.json()).then(data =>{
                console.log(data.status)
                
                if(data.status == 200){
                    this.onClose();
                    message.success('Profile Updated Successfully!');
                    // window.location.replace("/patient")
                }
                
            }).catch(err =>{
                console.log(err)
            })
        }
    }

    render() {
        // console.log(this.state.guardianName)
        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}> 

                <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Profile</h3>
                {/* <hr /> */}
                <Row style={{marginTop:"3%"}}>
                    <Col span={8} style={{textAlign:'center'}}>
                        <Avatar size={200} icon={<UserOutlined />} />
                    </Col>
                    <Col span={8}  style={{marginTop:"1%"}}>
                        <h4>{this.state.fullName}</h4><br />
                        <Text strong>Email :</Text><Text> {this.state.email}</Text>
                        <br /><br /><Text strong>Mobile :</Text><Text> {this.state.phone}</Text>
                        <br /><br /><Text strong>Address :</Text><Text>{this.state.addressLine1+','+this.state.addressLine2+','+this.state.city}</Text>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Appointments" value={112893} />
                        <Statistic title="Pending Appoitments" value={112893} precision={0}  style={{marginTop:"5%"}}/>
                        <Button style={{ marginTop: 16 }} type="link">
                            Check Appointments
                        </Button>
                    </Col>
                </Row>

                <Row >
                    <Col span={8} style={{textAlign:'center'}}>
                        {/* <h4 style={{marginTop:"25%"}}>More Information</h4><br /> */}
                        <Button type="primary" onClick={this.showDrawer} style={{marginTop:"10%"}}>
                            Update Profile
                        </Button>
                    </Col>
                    <Col span={8}  style={{marginTop:"1%"}}>
                        <h4 style={{marginTop:"5%"}}>More Information</h4><br />
                        <Text strong>Age :</Text><Text> {this.state.age}</Text>
                        <br /><br /><Text strong>Date of Birth :</Text><Text> {this.state.dateOfBirth}</Text>
                        <br /><br /><Text strong>Profession :</Text><Text> {this.state.profession}</Text>
                        {/* <br /><br /><Text strong>Address :</Text><Text> No.23, Javatta, Colombo 03</Text> */}
                    </Col>
                    {/* <Col span={6} style={{textAlign:'center'}}>
                        <h4 style={{marginTop:"25%"}}>Guardian Information</h4><br />
                    </Col> */}
                    <Col span={8} style={{marginTop:"1%"}}>
                        <h4 style={{marginTop:"5%"}}>Guardian Information</h4><br />
                        <Text strong>Name :</Text><Text> {this.state.guardianName}</Text>
                        <br /><br /><Text strong>Email :</Text><Text> {this.state.guardianEmail}</Text>
                        <br /><br /><Text strong>Mobile :</Text><Text> {this.state.guardianPhone}</Text>
                        {/* <br /><br /><Text strong>Address :</Text><Text> No.23, Javatta, Colombo 03</Text> */}
                    </Col>
                </Row>

                <Drawer
                    title="Update Your Profile"
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
                        <Button onClick={this.handleSubmit} type="primary">
                            Update Profile
                        </Button>
                        </div>
                    }
                    >
                    <Form
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
                        // onValuesChange={onFormLayoutChange}
                        size={this.state.componentSize}
                    >
                        
                        <Form.Item 
                            label="Full Name"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your Full Name!',
                                },
                            ]}
                            >
                            <Input placeholder="Your Full Name" defaultValue={this.state.fullName} name="fullName" onChange={this.handleChange}/>
                        </Form.Item>

                        <Form.Item 
                            label="Suffix"
                            rules={[
                                {
                                required: true,
                                message: 'Please select your Suffix!',
                                },
                            ]}
                            >
                            <Select
                                defaultValue={this.state.suffix}
                                onChange={this.onSelect}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            >
                                <Select.Option value="Dr">Dr</Select.Option>
                                <Select.Option value="Mr">Mr</Select.Option>
                                <Select.Option value="Mrs">Mrs</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="row">
                        
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <Form.Item 
                                style ={{paddingLeft:"20%"}}
                                label="Age"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your age!',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Age" name="age" 
                                    defaultValue={this.state.age} 
                                    onChange={this.onNumberChange}/>
                            </Form.Item>
                        </div>

                        <div className="col-md-6">
                            <Form.Item 
                                label="DOB"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your date of Birth!',
                                    },
                                ]}
                            >
                                <DatePicker name="dateOfBirth" 
                                    // defaultValue={this.state.patientObj.dateOfBirth}
                                    onChange={this.onDateChange}/>
                            </Form.Item>
                        </div>
                        <div className="col-md-1"></div>
                        </div>

                        <Form.Item label="Profession">
                            <Input placeholder="Enter Your Profession" 
                                defaultValue={this.state.profession} 
                                name="profession" onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item 
                            label="Address"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your address!',
                                },
                            ]}
                        >
                            <Row gutter={20}>
                                    <Col span={8}>
                                        <Form.Item
                                            name="addressLine1"
                                            rules={[{ required: false, message: 'Please Enter address line 1' }]}
                                        >
                                            <Input placeholder="Address line 1" 
                                                defaultValue={this.state.addressLine1} 
                                                name="addressLine1" onChange={this.handleChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                        name="addressLine2"
                                        rules={[{ required: false, message: 'Please Enter address line 2' }]}
                                        >
                                        <Input placeholder="Address line 2" 
                                            defaultValue={this.state.addressLine2} 
                                            name="addressLine2" onChange={this.handleChange}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="city"
                                            rules={[{ required: false, message: 'Please Enter city' }]}
                                        >
                                            <Input placeholder="City" name="city" 
                                                    defaultValue={this.state.city}
                                                    onChange={this.handleChange}/>
                                        </Form.Item>
                                    </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item 
                            label="Phone"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your Phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Your Phone Number" name="phone" 
                                defaultValue={this.state.phone} 
                                onChange={this.handleChange}/>
                        </Form.Item>

                        <Form.Item 
                            label="Email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Your Email" name="email"
                             defaultValue={this.state.email}
                              onChange={this.handleChange}/>
                        </Form.Item>

                        <Form.Item 
                            label="Guardian's Name"
                            rules={[
                                {
                                required: true,
                                message: "Please input your Guardian's Name!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter Your your Guardian's Name"  name="guardianName" 
                                defaultValue={this.state.guardianName} 
                                onChange={this.handleChange}/>
                        </Form.Item>

                        <Form.Item 
                            label="Guardian's Phone"
                            rules={[
                                {
                                required: true,
                                message: "Please input your Guardian's phone number!",
                                },
                            ]}
                        >
                         <Input placeholder="Enter Your your Guardian's Phone Number" name="guardianPhone"
                             defaultValue={this.state.guardianPhone} 
                             onChange={this.handleChange}/>
                        </Form.Item>

                        <Form.Item 
                            label="Guardian's Email"
                            rules={[
                                {
                                required: true,
                                message: "Please input your Guardian's Email!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter Your your Guardian's Email" name="guardianEmail"
                                 defaultValue={this.state.guardianEmail} 
                                 onChange={this.handleChange}/>
                        </Form.Item>

                        {/* <Form.Item label="">
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:"100%", marginLeft:"28%"}}>Update Profile</Button>
                        </Form.Item> */}
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default PatientProfile
