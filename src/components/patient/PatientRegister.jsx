import React, { Component } from 'react'
import { Layout } from 'antd';
import { Row, Col } from 'antd';

// import Logo from './../../assets/img/pmslogo.png'
import Logo2 from './../../assets/img/outlined logo.png'

import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,

} from 'antd';

const { Header } = Layout;

class PatientRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            componentSize: 'default',
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
  
    onBlur = () => {
      console.log('blur');
    }
  
    onFocus = () => {
      console.log('focus');
    }

    handleSubmit = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(this.state.password !== this.state.confirmPassword){
          // message.error("Password mismatch");
          alert("Password mismatch")

      }else if(!re.test(String(this.state.email).toLowerCase())){
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
              guardianEmail:this.state.guardianEmail,

          }
          console.log(data);
  
          fetch('http://localhost:8000/patient/reg',{
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
                  window.location.replace("/patientlogin")
              }
              
          }).catch(err =>{
              console.log(err)
          })
      }
    }
  render() {

    // const onFormLayoutChange = ({ size }) => {
    //     this.state.setComponentSize(size);
    //   };

    // const onFinish = (values) => {
    //   console.log('Success:', values);
    // };
  
    // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
    // };

    return (

      <div style={{backgroundColor:"#EDEDED"}}>

        <Header className="site-layout-background" style={{ padding: "1.2%", display:"flex",backgroundColor:"#001529"}} >
          <img src={Logo2} alt="" style={{marginLeft:"2%", marginRight:"2%"}} /> 
            <h5 style={{color:"white",marginTop:"0.1%"}}>Patient Management System</h5>
            {/* <h6 style={{color:"white"}}>Logout</h6> */}
        </Header>

        <div className="log-card" style={{width:"80%", margin:"3% 10% 2% 10%", backgroundColor:"white", borderRadius:"2%", padding:"5%"}}>
          <div className="heading" style={{display:"flex", margin: "auto", width: "40%"}}>
            <h2 style={{marginTop:"3%"}}>WELCOME TO</h2>
            <img src={Logo2} alt="" style={{width:"150px", height:"50px", marginLeft:"5%",marginTop:"1%"}}/>
          </div>

          {/* <DatePicker onChange={this.onChange} /> */}

          <div style={{marginLeft:"10%", marginTop:"5%", width:"90%", textAlign:"center"}}>
            <Form
                labelCol={{
                span: 4,
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
                  <Input placeholder="Your Full Name" name="fullName" onChange={this.handleChange}/>
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
                    placeholder="Select your Suffix"
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
                      <InputNumber placeholder="Age" name="age" onChange={this.onNumberChange}/>
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <Form.Item 
                      label="Date Of Birth"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your date of Birth!',
                        },
                      ]}
                    >
                      <DatePicker name="dateOfBirth" onChange={this.onDateChange}/>
                    </Form.Item>
                  </div>
                  <div className="col-md-1"></div>
                </div>

                <Form.Item label="Profession">
                  <Input placeholder="Enter Your Profession" name="profession" onChange={this.handleChange}/>
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
                      <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                name="addressLine1"
                                rules={[{ required: true, message: 'Please Enter address line 1' }]}
                                >
                                  <Input placeholder="Address line 1" name="addressLine1" onChange={this.handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name="addressLine2"
                                rules={[{ required: true, message: 'Please Enter address line 2' }]}
                                >
                                  <Input placeholder="Address line 2" name="addressLine2" onChange={this.handleChange}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Please Enter city' }]}
                                >
                                  <Input placeholder="City" name="city" onChange={this.handleChange}/>
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
                  <Input placeholder="Enter Your Phone Number" name="phone" onChange={this.handleChange}/>
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
                  <Input placeholder="Enter Your Email" name="email" onChange={this.handleChange}/>
                </Form.Item>

                <Form.Item 
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter Your Password" name="password" onChange={this.handleChange}/>
                </Form.Item>

                <Form.Item 
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Confirm Your Profession" name="confirmPassword" onChange={this.handleChange}/>
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
                  <Input placeholder="Enter Your your Guardian's Name"  name="guardianName" onChange={this.handleChange}/>
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
                  <Input placeholder="Enter Your your Guardian's Phone Number" name="guardianPhone" onChange={this.handleChange}/>
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
                  <Input placeholder="Enter Your your Guardian's Phone Email" name="guardianEmail" onChange={this.handleChange}/>
                </Form.Item>

                <Form.Item label="">
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:"100%", marginLeft:"28%"}}>Register</Button>
                </Form.Item>
            </Form>
          </div>
        </div>
        
        <p style={{textAlign:"center", paddingBottom:"1.2%"}}>Designed @2021 Created by PMS</p>

      </div>
    )
  }
}

export default PatientRegister
