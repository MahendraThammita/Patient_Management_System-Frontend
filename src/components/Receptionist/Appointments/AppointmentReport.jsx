import React, {useEffect, useState} from "react";
import { Input, Button,  Card, Space, List, DatePicker, Tag } from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import { DownloadOutlined } from '@ant-design/icons';
import RecepPHeader from "../commonComponents/RecepHeader";
import SideMenu from "../commonComponents/Menu";

const AppointmentReport = () => {

    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/receptionist/appointments/current";
        axios.get(url).then((res) => {

            setAppointments(res.data.appointments);

        })
    },[]);

    function onChange(date, dateString) {
        console.log(date);
            const url = "http://localhost:8090/receptionist/appointments/date/"+dateString;
            axios.get(url).then((res) => {
                setAppointments(res.data.appointments);
            })
    }

    const onSearch = value => console.log(value);

    return(
        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>
        <div style={{marginLeft: '20%', marginTop: '-35%'}}>

            <div style={{float:'right', marginRight:'5%'}}>
                <Button type="primary" shape="round" icon={<DownloadOutlined />}>Get Report </Button>
            </div>

            <Card
                style={{ width: '80%', height:500 }}
                cover={
                    <DatePicker onChange={onChange}/>
                }
            >


                <List
                    itemLayout="horizontal"
                    dataSource={appointments}
                    renderItem={appointment => (

                        <List.Item
                            actions={[<Tag color="green">{appointment.appointmentDate}</Tag>,<Tag color="purple">{appointment.status}</Tag>]}
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{appointment.patient.fullName}</a>}
                                description= {appointment.doctor.fullName}

                            />
                        </List.Item>
                    )}
                />,

            </Card>,
        </div>
        </div>
    )
}

export default AppointmentReport;