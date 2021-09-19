import React, { Component } from 'react';
import { Row, Col } from 'antd';

class GetReports extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>col-12</Col>
                    <Col span={16}>col-12</Col>
                </Row>
            </div>
        );
    }
}

export default GetReports;