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
                            <Text strong><Link href="#" target="_blank"> Fasting Blood Sugar Test : </Link><Text type="success"> Allen Brian </Text></Text>
                        </Row>
                        <Row>
                            <Text strong>Collection Time : <Text strong type="danger" level={4}>16:25:00</Text></Text>
                        </Row>
                        <Row>
                            <Col span={14} offset={10}>
                                <Link href="https://ant.design" target="_blank" strong>
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
