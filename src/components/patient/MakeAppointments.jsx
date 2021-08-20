import React, { Component } from 'react'

import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,

} from 'antd';

class MakeAppointments extends Component {
    constructor(props){
        super(props);
        this.state = {
            componentSize: 'default',
            fullName: '',
            suffix: '',
            age:0,
            dateOfBirth:'',
            profession:'',
            address:'',
            phone:'',
            email:'',
            password:'',
            confirmPassword:'',
            guardianName:'',
            guardianPhone:'',
            guardianEmail:'',
        }
    }

    render() {
        const onFormLayoutChange = ({ size }) => {
            this.state.setComponentSize(size);
          };
    
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <h3 style={{textAlign:"center", marginTop:"1%"}}>Create Appointment</h3>

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
                    onValuesChange={onFormLayoutChange}
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
                    <Input  name="fullName" onChange={this.handleChange}/>
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
                        <InputNumber  name="age" onChange={this.onNumberChange}/>
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
                    <Input  name="profession" onChange={this.handleChange}/>
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
                    <Input  name="address" onChange={this.handleChange}/>
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
                    <Input  name="phone" onChange={this.handleChange}/>
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
                    <Input name="email" onChange={this.handleChange}/>
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
                    <Input.Password name="password" onChange={this.handleChange}/>
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
                    <Input.Password name="confirmPassword" onChange={this.handleChange}/>
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
                    <Input  name="guardianName" onChange={this.handleChange}/>
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
                    <Input  name="guardianPhone" onChange={this.handleChange}/>
                    </Form.Item>

                    <Form.Item 
                    label="Guardian's Email"
                    rules={[
                        {
                        required: true,
                        message: "Please input your Guardian's phone number!",
                        },
                    ]}
                    >
                    <Input  name="guardianEmail" onChange={this.handleChange}/>
                    </Form.Item>

                    <Form.Item label="">
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{width:"100%", marginLeft:"28%"}}>Register</Button>
                    </Form.Item>
                </Form>

            </div>

        )
    }
}

export default MakeAppointments