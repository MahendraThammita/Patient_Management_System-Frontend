import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Statistic, Button } from 'antd';
import { Typography, Space } from 'antd';
import { Drawer, Form, Input, Select, DatePicker } from 'antd';

const { Text, Link } = Typography;


class PatientProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            appointments:[],
            doctor:[],
            visible: false
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
        fetch(''+this.state.patient).then(res => res.json()).then(data =>{
          this.setState({appointments: data, doctor: data.doctor})
        //   console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        this.fetchPatient()
    }

    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}> 

                <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Profile</h3>
                {/* <hr /> */}
                <Row style={{marginTop:"3%"}}>
                    <Col span={8} style={{textAlign:'center'}}>
                        <Avatar size={200} icon={<UserOutlined />} />
                    </Col>
                    <Col span={8}  style={{marginTop:"1%"}}>
                        <h4>Mr. John Doe</h4><br />
                        <Text strong>Email :</Text><Text> joohndoe@gmail.com</Text>
                        <br /><br /><Text strong>Mobile :</Text><Text> 0771531426</Text>
                        <br /><br /><Text strong>Address :</Text><Text> No.23, Javatta, Colombo 03</Text>
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
                        <Text strong>Email :</Text><Text> joohndoe@gmail.com</Text>
                        <br /><br /><Text strong>Email :</Text><Text> joohndoe@gmail.com</Text>
                        <br /><br /><Text strong>Mobile :</Text><Text> 0771531426</Text>
                        <br /><br /><Text strong>Address :</Text><Text> No.23, Javatta, Colombo 03</Text>
                    </Col>
                    {/* <Col span={6} style={{textAlign:'center'}}>
                        <h4 style={{marginTop:"25%"}}>Guardian Information</h4><br />
                    </Col> */}
                    <Col span={8} style={{marginTop:"1%"}}>
                        <h4 style={{marginTop:"5%"}}>Guardian Information</h4><br />
                        <Text strong>Email :</Text><Text> joohndoe@gmail.com</Text>
                        <br /><br /><Text strong>Email :</Text><Text> joohndoe@gmail.com</Text>
                        <br /><br /><Text strong>Mobile :</Text><Text> 0771531426</Text>
                        <br /><br /><Text strong>Address :</Text><Text> No.23, Javatta, Colombo 03</Text>
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
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please select the docor' }]}
                                >
                                    <Select placeholder="Please select an owner">
                                        {/* <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option> */}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                name="owner"
                                label="Prefered Timeslot"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select placeholder="Please select an owner">
                                    {/* <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option> */}
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
                                    {/* <Option value="private">Private</Option>
                                    <Option value="public">Public</Option> */}
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
                                {/* <Option value="jack">Jack Ma</Option>
                                <Option value="tom">Tom Liu</Option> */}
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

export default PatientProfile
