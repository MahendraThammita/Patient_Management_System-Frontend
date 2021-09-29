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
import moment from "moment";

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
    },[])

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    const onDelete = (timeSlot) => {
        const url = "http://localhost:8090/receptionist/appointments/delete/"+appointmentID;
        axios.delete(url).then((res) => {
            if(res.data.status === 200){
                alert("Appointment Deleted");
                history.push('/receptionist-dashboard')
            }
            else{
                alert("Something went wrong");
            }
        })
    }

    return (

        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>
            <AppointmentTimeSlots doctorID={doctorID} appointmentID={appointmentID}/>
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
                        title={"Patient Name"}
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
                            description={moment(date).format('YYYY-MM-DD')}
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                <Button onClick={onDelete} type="danger" htmlType="submit">
                    Delete
                </Button>
                <Button onClick={onSubmit} style={{marginLeft:'5%'}} type="primary" htmlType="submit">
                    Back
                </Button>
                </Form.Item>
            </div>
        </div>
    );
};

export default ViewAppointment;