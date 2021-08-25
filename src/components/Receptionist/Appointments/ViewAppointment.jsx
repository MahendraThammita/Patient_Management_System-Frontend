import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, List, Button, Tag} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import UpdateTimeSlots from "../UpdateTimeSlot";
import AppointmentTimeSlots from "../AppointmentTimeSlot";
import TimeSlots from "../TimeSlots";
import RecepPHeader from "../commonComponents/RecepHeader";
import SideMenu from "../commonComponents/Menu";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ViewAppointment = () => {

    const params = useParams();
    const appointmentID = params.appointmentID;
    const doctorID = params.doctorID;

    const  history = useHistory();

    const [status, setStatus] = useState('In');
    const [appointment, setAppointment] = useState();


    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
        const url = "http://localhost:8090/receptionist/appointments/view/"+appointmentID;
        axios.get(url).then((res) => {

            setAppointment(res.data.appointment[0]);



        })
    },[])

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    return (

        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>
            <AppointmentTimeSlots doctorID={doctorID}/>
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
                    Save
                </Button>
            </div>
        </div>
    );
};

export default ViewAppointment;