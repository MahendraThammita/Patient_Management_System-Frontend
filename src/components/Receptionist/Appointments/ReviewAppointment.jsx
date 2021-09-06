import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, List, Button, Tag} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import UpdateTimeSlots from "../UpdateTimeSlot";
import AppointmentTimeSlots from "../AppointmentTimeSlot";
import NotificationMessage from "./NotificationMessage";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReviewAppointment = () => {

    const  history = useHistory();
    const params = useParams();
    const appointmentID = params.appointmentID;

    const [doctor, setDoctor] = useState();
    const [patient, setPatient] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
        const url = "http://localhost:8090/receptionist/appointments/view/"+appointmentID;
        axios.get(url).then((res) => {

            setDoctor(res.data.appointment[0].doctor.fullName);
            setPatient(res.data.appointment[0].patient.fullName);
            setTime(res.data.appointment[0].appointmentTimeSlot);
            setDate(res.data.appointment[0].appointmentDate);
            setStatus(res.data.appointment[0].status);
        })
    })

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    return (

        <div>

            <NotificationMessage/>

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
                                description={patient}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={'Doctor Name'}
                                description={doctor}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={'Date'}
                                description={date}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={'Time'}
                                description={time}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                title={'Status'}
                                description={ <Tag color="orange">{status}</Tag>}
                            />
                        </List.Item>
                    </List>
                </div>
            </div>
        </div>
    );
};

export default ReviewAppointment;