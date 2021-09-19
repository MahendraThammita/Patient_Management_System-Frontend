import React, { Component } from 'react'
import {Row, Layout, Typography, Menu} from 'antd';
import {SnippetsOutlined , CarryOutOutlined , ExperimentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';

const { Title } = Typography;
const { Content } = Layout;

export default class SummerySection extends Component {
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
                        minHeight: 80,
                    }}
                >
                    <Title level={3}>Daily Summery</Title>
                    <Row justify="end" align="bottom">
                        <Title level={3} type="secondary">Total Jobs <SnippetsOutlined /></Title>

                    </Row>
                    <Row justify="end" align="top">
                        <Title level={2}>56</Title>
                    </Row>

                    <Row justify="end" align="bottom">
                        <Title level={3} type="secondary">Appontments <CarryOutOutlined /></Title>
                    </Row>
                    <Row justify="end" align="top">
                        <Title level={2}>{this.props.appointmentsCountForToday}</Title>
                    </Row>

                    <Row justify="end" align="bottom">
                        <Title level={3} type="secondary">Sample Collections <ExperimentOutlined /></Title>
                    </Row>
                    <Row justify="end" align="top">
                        <Title level={2}>28</Title>
                    </Row>
                </Content>
            </div>
        )
    }
}
