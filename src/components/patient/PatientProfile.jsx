import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Statistic, Button } from 'antd';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;


export class PatientProfile extends Component {
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
                        <Button style={{ marginTop: 16 }} type="primary">
                            Check
                        </Button>
                    </Col>
                </Row>

                <Row style={{marginTop:"3%"}}>
                    <Col span={8} style={{textAlign:'center'}}>
                        {/* <h4 style={{marginTop:"25%"}}>More Information</h4><br /> */}
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
            </div>
        )
    }
}

export default PatientProfile
