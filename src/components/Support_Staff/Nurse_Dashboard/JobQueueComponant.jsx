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
        }
    }
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
                    <JobQueueItemComponant/>
                    <JobQueueItemComponant/>
                </Content>
            </div>
        )
    }
}
