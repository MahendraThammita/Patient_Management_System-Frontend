import React, { Component } from 'react'
import { Layout } from 'antd';

// import Logo from './../../assets/img/pmslogo.png'
import Logo2 from './../../assets/img/outlined logo.png'

import { Form, Input, Button, Checkbox} from 'antd';

const { Header } = Layout;

class PatientLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : ''
    }
  }

  handleChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
    console.log({[e.target.name]:e.target.value})
  }

  handleSubmit = () =>{

    //checking data
    const data = {
      email : this.state.email,
      password : this.state.password
    }

    fetch('http://localhost:8090/patient/login',{
      method : 'POST',
      headers : {
        'Content-type' : 'Application/json'
      },
      body : JSON.stringify(data)
    }).then(res =>res.json()).then(data =>{
      if(data.token){
        window.localStorage.setItem('id',data.id)
        window.localStorage.setItem('token',data.token)
        window.localStorage.setItem('user_type','patient')
        window.localStorage.setItem('user_id',data.id)
        window.location.replace('/patient')
      }
      console.log(data);
    }).catch(err =>{
      console.log(err);
    })

  }

  render() {

    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (

      <div style={{backgroundColor:"#EDEDED"}}>

        <Header className="site-layout-background" style={{ padding: "1.2%", display:"flex", backgroundColor:"#001529"}} >
          <img src={Logo2} alt="" style={{marginLeft:"2%", marginRight:"2%"}} /> 
            <h5 style={{color:"white",marginTop:"0.1%"}}>Patient Management System</h5>
            {/* <h6 style={{color:"white"}}>Logout</h6> */}
        </Header>

        <div className="log-card" style={{width:"80%", margin:"3% 10% 2% 10%", backgroundColor:"white", borderRadius:"2%", padding:"5%"}}>
          <div className="heading" style={{display:"flex", margin: "auto", width: "40%"}}>
            <h2 style={{marginTop:"1.5%"}}>Welcome back to</h2>
            <img src={Logo2} alt="" style={{width:"150px", height:"50px", marginLeft:"3%",marginTop:"1%"}}/>
          </div>

          <div style={{marginLeft:"10%", marginTop:"5%", width:"60%", textAlign:"center"}}>
            <Form
              name="basic"
              labelCol={{span: 8,}}
              wrapperCol={{span: 16,}}
              initialValues={{remember: true,}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input name="email" onChange={this.handleChange}/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password name="password" onChange={this.handleChange}/>
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:"100%"}} >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        
        <p style={{textAlign:"center", paddingBottom:"1.2%"}}>Designed @2021 Created by PMS</p>

      </div>
    )
  }
}

export default PatientLogin
