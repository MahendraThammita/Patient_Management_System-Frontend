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
        }
    }
    render() {
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
                            <Text strong>Allen Brian <Link href="#" target="_blank"> Appointment </Link> for doctor  <Text type="success"> Eric Burg. </Text></Text>
                        </Row>
                        <Row>
                            <Title strong type="danger" level={4}>16:25:00</Title>
                        </Row>
                        <Row>
                            <Col span={14} offset={10}>
                                <Link onClick={() => window.location.replace('/create-prescription')} target="_blank" strong>
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
