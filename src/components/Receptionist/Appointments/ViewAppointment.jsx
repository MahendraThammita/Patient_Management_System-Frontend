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

const ViewAppointment = () => {

    const  history = useHistory();

    const [status, setStatus] = useState('In');


    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
    })

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    return (

        <div>
            <AppointmentTimeSlots/>

            <div className="uditha-left-form-container">

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Appointment Details"
                />

                <div style={{marginRight:"80%"}}>
                <List itemLayout="horizontal">
                <List.Item>
                    <List.Item.Meta
                        title={'Patient Name'}
                        description="Mr Leo Doe"
                    />
                </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={'Doctor Name'}
                            description="Dr John Doe"
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={'Time'}
                            description="04.00 pm"
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={'Status'}
                            description={ <Tag color="orange">pending</Tag>}
                        />
                    </List.Item>
                </List>
                    </div>
                <Button onClick={onSubmit} style={{marginLeft:'60%'}} type="primary" htmlType="submit">
                    Submit schedule
                </Button>
            </div>
        </div>
    );
};

export default ViewAppointment;