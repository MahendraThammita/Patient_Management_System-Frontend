import React, {useEffect, useState} from "react";
import { Input, Button,  Card, Space, List, DatePicker, Tag } from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import RecepPHeader from "../commonComponents/RecepHeader";
import SideMenu from "../commonComponents/Menu";
import moment from "moment";
import JsPDF from 'jspdf';

const AppointmentReport = () => {

    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
      getAppointments();
    },[]);

    function onChange(date, dateString) {
        console.log(date);
            const url = "http://localhost:8090/receptionist/appointments/date/"+dateString;
            axios.get(url).then((res) => {
                setAppointments(res.data.appointments);
            })
    }

    const getAppointments = () => {
        const url = "http://localhost:8090/receptionist/appointments/current";
        axios.get(url).then((res) => {

            setAppointments(res.data.appointments);
        })
    }

    const generatePDF = () => {

        const report = new JsPDF('portrait', 'pt', 'a3');
        report.html(document.querySelector('#report')).then(() => {
            report.save('report.pdf');
        });
    }

    return(
        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>
        <div style={{marginLeft: '20%', marginTop: '-35%'}}>

            <div style={{float:'right', marginRight:'5%'}}>
                <Button onClick={generatePDF} type="primary" shape="round" icon={<DownloadOutlined />}>Get Report </Button>

            <br/>
                <br/>
                <Button onClick={getAppointments} type="danger" shape="round" icon={<CloseOutlined />}>Clear filters </Button>
            </div>

            <Card
                style={{ width: '80%', height:500 }}
                cover={
                    <DatePicker onChange={onChange}/>
                }
            >

<div id="report">
                <List
                    itemLayout="horizontal"
                    dataSource={appointments}
                    renderItem={appointment => (

                        <List.Item
                            actions={[<Tag color="green">{moment(appointment.appointmentDate).format('YYYY-MM-DD')}</Tag>,<Tag color="purple">{appointment.status}</Tag>]}
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{appointment.patient.fullName}</a>}
                                description= {appointment.doctor.fullName}

                            />
                        </List.Item>
                    )}
                />
</div>

            </Card>,
        </div>
        </div>
    )
}

export default AppointmentReport;