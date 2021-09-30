import React, { Component } from 'react'
import { Row, Col, Typography, Divider, Avatar } from 'antd';
import { EditTwoTone , SnippetsTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';

const { Title, Text, Link } = Typography;

export default class JobQueueItemComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleChange = (e) =>{
        localStorage.setItem("selected_labTest",this.props.test._id);
        window.location.replace('/conduct-test')
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                            icon={<SnippetsTwoTone />} 
                        />,
                    </Col>
                    <Col span={20}>
                        <Row>
                            {this.props.test.testName && this.props.test.patient.fullName &&
                                <Text strong><Link href="#" target="_blank"> {this.props.test.testName} : </Link><Text type="success"> {this.props.test.patient.fullName} </Text></Text>
                            }
                        </Row>
                        <Row>
                            {this.props.test.TimeSlot && 
                                <Text strong>Collection Time : <Text strong type="danger" level={4}>{this.props.test.TimeSlot}:00</Text></Text>
                            }
                            
                        </Row>
                        <Row>
                            <Col span={14} offset={10}>
                                <Link onClick={this.handleChange} target="_blank" strong>
                                    <EditTwoTone /> Start Testing
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
