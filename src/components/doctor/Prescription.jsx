import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { months } from 'moment';
import { Divider } from 'antd';
import { Modal, message } from 'antd';

const { Option } = Select;

class Prescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            patient: {},
            startWeek: '',
            endWeek: '',
            testList: [],
            description: '',
            isModalVisible: false
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

    handleChange = (value) => {

        var list = new Array(value)

        this.setState({ testList: list })

        console.log(list);
    }

    onDateChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString[0]);

        this.setState({ startWeek: dateString[0], endWeek: dateString[1] })
    }

    handleInput = (e) => {
        this.setState({ description: e.target.value })
    }

    onSubmit = () => {

        const data = {
            startWeek: this.state.startWeek,
            endWeek: this.state.endWeek,
            docDesc: this.state.description,
            test: this.state.testList,
            appId: this.props.appId
        }


        fetch("http://localhost:8090/prescription/update/prescription/" + this.props.prescription._id, {
            method: "PATCH",
            headers: {
                'Content-type': 'Application/json',
                Authorization: "Bearer " + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => {

            if (res.status === 201) {
                window.location.reload()
            }
        })



        this.setState({
            visible: false,
        });

        setTimeout(() => {
            this.props.onclose('close')
        }, 1000);
    }

    showModal = () => {
        this.setState({ isModalVisible: true })
    };

    handleOk = () => {

        console.log('inside the handel OK');
        const hide = message.loading('Action in progress.. Page will be refreshd once the action is compleated', 0);
        

        const date = new Date()

        const data = {
            startWeek: this.state.startWeek,
            endWeek: this.state.endWeek,
            docDesc: this.state.description,
            test: this.state.testList,
            appId: this.props.appId,
            createDoc: 'yes',
            date: date.toJSON().slice(0, 10).replace(/-/g, '/'),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
            billing: {
                name: this.props.patient.fullName,
                address: this.props.patient.addressLine1,
                city: this.props.patient.addressLine2,
                state: this.props.patient.city,
                country: 'Sri Lanka'
            },
            weight: this.props.prescription.weight,
            bp_Systolic : this.props.prescription.bp_Systolic,
            bp_Diastolic : this.props.prescription.bp_Diastolic,
            age : this.props.prescription.age,
            doctor: window.localStorage.getItem('name'),
            memo: 'This document is strictly private, confidential and personal to its recipients and should not be copied, distributed or reproduced in whole or in part, nor passed to any third party.',



        }


        fetch("http://localhost:8090/prescription/update/prescription/" + this.props.prescription._id, {
            method: "PATCH",
            headers: {
                'Content-type': 'Application/json',
                Authorization: "Bearer " + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data) {
                setTimeout(hide, 2500);
                window.location.reload();
            }
        })



        this.setState({
            visible: false,
        });

        setTimeout(() => {
            this.props.onclose('close')
        }, 1000);

        this.setState({ isModalVisible: false })
    };

    handleCancel = () => {
        const data = {
            startWeek: this.state.startWeek,
            endWeek: this.state.endWeek,
            docDesc: this.state.description,
            test: this.state.testList,
            appId: this.props.appId,
            createDoc: 'no'
        }


        fetch("http://localhost:8090/prescription/update/prescription/" + this.props.prescription._id, {
            method: "PATCH",
            headers: {
                'Content-type': 'Application/json',
                Authorization: "Bearer " + window.localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 201) {
                window.location.reload()
            }
        })



        this.setState({
            visible: false,
        });

        setTimeout(() => {
            this.props.onclose('close')
        }, 1000);

        this.setState({ isModalVisible: false })
    };

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
                            <Button onClick={() => this.setState({ isModalVisible: true })} type="primary" htmlType="submit">
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
                        <Divider plain>Patients Information</Divider>
                        <Row gutter={16}>
                            <Col span={12}>
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
                            <Form.Item
                                name="patient"
                                label="Age"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Input
                                    disabled="true"
                                    placeholder="Please enter url"
                                    defaultValue={this.props.prescription.age + " Years Old"}
                                />
                            </Form.Item>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="patient"
                                    label="Weight"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={this.props.prescription.weight + " KG"}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="patient"
                                    label="Height"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={this.props.prescription.height + " CM"}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="patient"
                                    label="Latest bp_Systolic"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={this.props.prescription.bp_Systolic}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="patient"
                                    label="Latest bp_Diastolic"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Input
                                        disabled="true"
                                        placeholder="Please enter url"
                                        defaultValue={this.props.prescription.bp_Diastolic}
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
                                        onChange={this.onDateChange}
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
                                    <Input.TextArea required rows={4} placeholder="please enter url description" onChange={this.handleInput} name="description" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="test"
                                    label="Tests"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter url description',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={this.handleChange}
                                    >
                                        <Option key="1" value="blood analysis">blood analysis</Option>
                                        <Option key="2" value="kidney function test">kidney function test</Option>
                                        <Option key="3" value="liver function test">liver function test</Option>
                                        <Option key="4" value="Biopsy">Biopsy</Option>
                                        <Option key="5" value="CT scan">CT scan</Option>
                                        <Option key="6" value="Electrocardiogram (ECG)">blood analysis</Option>
                                        <Option key="7" value="Eye tests">Eye tests</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>

                <Modal title="Document Creation" visible={this.state.isModalVisible} footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        No, I dont want a docuemnt
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Yes, Make the Document
                    </Button>,
                ]}>
                    <p>Do you want this prescription available as a document? If yes, this will be automatically uploaded to the cloud storage and will be availbale for any-time access</p>
                    <p>A copy will downloded instantly!!</p>
                </Modal>
            </>
        );
    }
}

export default Prescription;