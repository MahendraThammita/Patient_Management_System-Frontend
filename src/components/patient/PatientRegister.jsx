import React, { Component } from 'react'
import { Layout } from 'antd';

import Logo from './../../assets/img/pmslogo.png'
import Logo2 from './../../assets/img/outlined logo.png'

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';

const { Header } = Layout;

class PatientRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            componentSize: 'default'
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
                onValuesChange={onFormLayoutChange}
                size={this.state.componentSize}
            >
                <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
                </Form.Item>
                <Form.Item label="Input">
                <Input />
                </Form.Item>
                <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                    {
                        title: 'Light',
                        value: 'light',
                        children: [
                        {
                            title: 'Bamboo',
                            value: 'bamboo',
                        },
                        ],
                    },
                    ]}
                />
                </Form.Item>
                <Form.Item label="Cascader">
                <Cascader
                    options={[
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                        {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                        },
                        ],
                    },
                    ]}
                />
                </Form.Item>
                <Form.Item label="DatePicker">
                <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                <Switch />
                </Form.Item>
                <Form.Item label="Button">
                <Button>Button</Button>
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
