import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import Doctor from './../../assets/img/Doctor.png'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const { Meta } = Card;

const onSearch = value => console.log(value);

class AllDoctors extends Component {
  render() {
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row >
                <Col span={16}></Col>
                <Col span={7}><Search placeholder="Search Doctors" onSearch={onSearch} enterButton /></Col>
                <Col span={2}></Col>
                
            </Row><br /><br />
            <Row >
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
            </Row>
            <br /><br />
            <Row >
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240}}
                        // title = 'Doctor 001'
                        cover={<img alt="example" src={Doctor} />}
                    >
                        <Meta title="Name of the doctor" description="Specialization" />
                    </Card>
                </Col>
            </Row>
        </div>

    )
  }
}

export default AllDoctors
