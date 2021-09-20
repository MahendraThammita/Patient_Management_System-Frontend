import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, List, Button, Tag} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import UpdateTimeSlots from "../UpdateTimeSlot";
import AppointmentTimeSlots from "../AppointmentTimeSlot";
import NotificationMessage from "./NotificationMessage";
import RecepPHeader from "../commonComponents/RecepHeader";
import SideMenu from "../commonComponents/Menu";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";

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
    const [email, setEmail] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
        const url = "http://localhost:8090/receptionist/appointments/view/"+appointmentID;
        axios.get(url).then((res) => {

            setDoctor(res.data.appointment[0].doctor.fullName);
            setPatient(res.data.appointment[0].patient.fullName);
            setEmail(res.data.appointment[0].patient.email);
            setTime(res.data.appointment[0].appointmentTimeSlot);
            setDate(res.data.appointment[0].appointmentDate);
            setStatus(res.data.appointment[0].status);
        })
    })

    const onApprove = () => {

        const data = {
            "email": email
        }

        const url = "http://localhost:8090/receptionist/appointments/approve/"+appointmentID;
        axios.put(url, data).then((res) => {
            if(res.data.status === 200){
                alert("Approved");
            }
            else{
                alert("Something went wrong");
            }
        })

        history.push('/receptionist-dashboard')
    }

    const onDecline = () => {

        const data = {
            "email": email
        }

        const url = "http://localhost:8090/receptionist/appointments/decline/"+appointmentID;
        axios.put(url, data).then((res) => {
            if(res.data.status === 200){
                alert("Declined");
            }
            else{
                alert("Something went wrong");
            }
        })
        history.push('/receptionist-dashboard')
    }

    return (

        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>

            <div className="uditha-left-form-container">

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Appointment Details"
                />

                <div >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off" >
                        <Form.Item label="Patient">
                            <Input disabled={true} value={patient}/>
                        </Form.Item>
                        <Form.Item label="Doctor">
                            <Input disabled={true} value={doctor}/>
                        </Form.Item>
                        <Form.Item  label="Date">
                            <Input disabled={true} value={moment(date).format('YYYY-MM-DD')}/>
                        </Form.Item>
                        <Form.Item  label="Time">
                            <Input disabled={true} value={time}/>
                        </Form.Item>
                        <Form.Item  label="Status">
                            <Input disabled={true} value={status}/>
                        </Form.Item>


                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                            <Button onClick={onApprove} type="primary" htmlType="submit">
                                Approve
                            </Button>
                            <Button onClick={onDecline} style={{marginLeft: '5px'}} type="danger" htmlType="submit">
                                Decline
                            </Button>

                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ReviewAppointment;