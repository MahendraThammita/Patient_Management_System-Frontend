import React, { Component } from 'react'
import { Row, Layout, Typography, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';

const { Title } = Typography;
const { Content } = Layout;

export default class PatientCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 24,
                        paddingBottom: 24,
                        margin: 16,
                        minHeight: 330
                    }}
                >

                    <Row justify='center'>
                        <Title strong level={3}>Patient Details</Title>
                    </Row>
                    <Row justify='start'>
                        <Col span={8}>
                            <Avatar
                                src="https://image.pngaaa.com/408/81408-middle.png"
                                size={{ xs: 24, sm: 32, md: 40, lg: 80, xl: 80, xxl: 100 }}
                            />,
                        </Col>
                        <Col span={14} offset={2}>
                            <Row>
                                <Title strong level={4}>{this.props.patientName}</Title>
                            </Row>
                            <Row>
                                <Title strong type="secondary" level={5}>{this.props.age} Years</Title>
                            </Row>
                        </Col>
                        <Title strong level={1}> </Title>
                    </Row>
                    <Row justify='start'>
                        <Title type="secondary" strong level={3}>Appointment To </Title>
                    </Row>
                    <Row justify='end'>
                        <Title strong level={4}>{this.props.doctorName} </Title>
                    </Row>
                    <Row justify='start'>
                        <Title type="secondary" strong level={3}>Appointment Time </Title>
                    </Row>
                    <Row justify='end'>
                    <Title strong level={4}>{this.props.time + ":00"} </Title>
                    </Row>
                </Content>
            </div>
        )
    }
}
