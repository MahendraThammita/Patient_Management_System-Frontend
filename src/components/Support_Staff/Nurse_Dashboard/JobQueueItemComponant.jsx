import React, { Component } from 'react'
import { Row, Col, Typography, Divider, Avatar } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';

const { Title, Text, Link } = Typography;

export default class JobQueueItemComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName :'',
            DoctorName : '',
        }
    }
    handleChange = (e) =>{
        localStorage.setItem("selected_appointment",this.props.appointment._id);
        window.location.replace('/create-prescription')
    }
    render() {
        var patientName ='';
        var DoctorName ='';
       
       
        return (
            <div>
                <Row>
                    <Col span={3}>
                        <Avatar
                            src="https://image.pngaaa.com/408/81408-middle.png"
                            size={{ xs: 24, sm: 32, md: 40, lg: 80, xl: 80, xxl: 100 }}
                        />,
                    </Col>
                    <Col span={20}>
                        
                        <Row>
                            <Text strong>{this.props.patientName} <Link href="#" target="_blank"> Appointment </Link> for doctor  <Text type="success"> {this.props.doctorName}. </Text></Text>
                        </Row>
                        <Row>
                            <Title strong type="danger" level={4}>{this.props.appointment.appointmentTimeSlot + ":00"}</Title>
                        </Row>
                        <Row>
                            <Col span={14} offset={10}>
                                <Link onClick={this.handleChange} target="_blank" strong>
                                    <EditTwoTone /> Create Prescription
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Divider />
                </Row>
            </div>
        )
    }
}
