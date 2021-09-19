import React, { Component } from 'react'
import {Row, Layout, Typography, Divider} from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import JobQueueItemComponant from './JobQueueItemComponant'

const { Title} = Typography;
const {Content } = Layout;

export default class JobQueueComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topAppointment : null,
            secoundAppointment : null
        }
    }
    // componentDidUpdate(){
    //     this.setState({ topAppointment : this.props.topAppointment })
    //     this.setState({ secoundAppointment : this.props.secoundAppointment })
    // }
    render() {
        
        return (
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 16,
                    }}
                >
                    <Row justify='start'>
                        <Title level={3}>Job Queue</Title>
                        <Divider />
                    </Row>
                    {/* <JobQueueItemComponant appointment={this.props.topAppointment ? this.props.topAppointment : null} patient={this.props.topAppointment.patient.fullName ? this.props.topAppointment.patient.fullName : null}/>
                    <JobQueueItemComponant appointment={this.props.secoundAppointment ? this.props.secoundAppointment : null}/> */}
                    {this.props.topAppointment && this.props.patientName1 && this.props.doctorName1 &&
                        <JobQueueItemComponant 
                            appointment={this.props.topAppointment}
                            patientName={this.props.patientName1}
                            doctorName={this.props.doctorName1}
                        />}
                    {this.props.secoundAppointment && this.props.patientName2 && this.props.doctorName2 &&
                         <JobQueueItemComponant 
                            appointment={this.props.secoundAppointment}
                            patientName={this.props.patientName2}
                            doctorName={this.props.doctorName2}
                        />}
                </Content>
            </div>
        )
    }
}
