import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, List, Button, Tag} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {useHistory} from "react-router-dom";
import UpdateTimeSlots from "../UpdateTimeSlot";
import AppointmentTimeSlots from "../AppointmentTimeSlot";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const NotificationMessage = () => {

    const  history = useHistory();
    const { TextArea } = Input;

    const [status, setStatus] = useState('In');


    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
    })

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    return (

        <div>

            <Form style={{marginLeft:'60%', marginTop:'20%'}} {...layout} >
                <Form.Item>
            <div style={{width: '80%'}}>
            <TextArea
                placeholder="Message to the Patient"
                autoSize={{ minRows: 6, maxRows: 50 }}
            />
            </div>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                <Button onClick={onSubmit} type="primary" htmlType="submit">
                    Approve
                </Button>
                <Button danger onClick={onSubmit} style={{marginLeft:'5px'}} type="primary" htmlType="submit">
                    Decline
                </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default NotificationMessage;