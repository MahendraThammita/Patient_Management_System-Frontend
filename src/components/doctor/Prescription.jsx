import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { months } from 'moment';

const { Option } = Select;

class Prescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            patient: {}
        }
    }


    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });

        setTimeout(() => {
            this.props.onclose('close')
        }, 1000);


    };

    componentDidMount() {
        console.log(this.props.patinet);
        this.setState({ patient: this.props.patient })
    }

    render() {
        //this.setState({visible : true})
        const date = new Date()
        return (
            <>
                <Drawer
                    title="Create a new Prescription"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="Date"
                                    disabled="true"
                                    label="date"
                                    rules={[{ required: true, message: 'Please enter user name' }]}
                                >
                                    <Input disabled="true" placeholder="Please enter user name" defaultValue={date.toJSON().slice(0, 10).replace(/-/g, '/')} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="time"
                                    label="Time"
                                    rules={[{ required: true, message: 'Please enter url' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="patient"
                                    label="Patient name"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={this.props.patient.fullName}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="doc"
                                    label="Doctor name"
                                    rules={[{ required: true, message: 'Please choose the approver' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={window.localStorage.getItem('name')}
                                    />

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="Time duration the patinet needs to take the medications"
                                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                                >
                                    <DatePicker.RangePicker
                                        style={{ width: '100%' }}
                                        picker="week"
                                        getPopupContainer={trigger => trigger.parentElement}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        );
    }
}

export default Prescription;