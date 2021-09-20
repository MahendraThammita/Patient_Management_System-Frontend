import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, Button, Card, Avatar, List, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../../../assets/css/uditha.css'
import {Link} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const PendingAppointment = () => {

    const { Search } = Input;

    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/receptionist/appointments/pending";
        axios.get(url).then((res) => {

            setAppointments(res.data.appointments);


        })
    },[])

    const onSearch = value => {
        const url = "http://localhost:8090/receptionist/appointments/pending/search/"+value;
        axios.get(url).then((res) => {

            setAppointments(res.data.appointments);
        })
    }


    return(
        <div style={{ marginRight:'30px'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Pending Appointments" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:'auto'}}
                cover={
                    <img style={{ width: 400, height:200}}
                         alt="example"
                         src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >


                <List style={{height:'250px', overflow: 'hidden' }}
                      itemLayout="horizontal"
                      dataSource={appointments}
                      renderItem={appointment => (

                          <List.Item
                              actions={[<Tag color="purple">{moment(appointment.appointmentDate).format('YYYY-MM-DD')}</Tag>, <Tag color="purple">{appointment.appointmentTimeSlot}</Tag>,
                                  <Link to ={`/receptionist/appointment/review/${appointment._id}`}>View</Link>]}
                          >
                              <List.Item.Meta
                                  title={<a href="https://ant.design">{appointment.patient.fullName}</a>}
                                  description={appointment.doctor.fullName}
                              />
                          </List.Item>
                      )}
                />,

            </Card>,
        </div>
    )
}

export default PendingAppointment;