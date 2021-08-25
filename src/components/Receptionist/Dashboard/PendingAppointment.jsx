import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, Button, Card, Avatar, List, Tag} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../../../assets/css/uditha.css'
import {Link} from "react-router-dom";
import axios from "axios";

const PendingAppointment = () => {

    const { Search } = Input;

    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/receptionist/appointments/pending";
        axios.get(url).then((res) => {

            console.log(res.data.appointments);
            setAppointments(res.data.appointments);

        })
    },[])

    const onSearch = value => console.log(value);


    return(
        <div style={{marginLeft: '20px', marginRight:'30px'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Current Appointments" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:'auto'}}
                cover={
                    <img style={{ width: 400, height:150}}
                         alt="example"
                         src="https://images.unsplash.com/photo-1624969862293-b749659ccc4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >


                <List style={{height:'150px',overflowY:'auto' }}
                      itemLayout="horizontal"
                      dataSource={appointments}
                      renderItem={appointment => (

                          <List.Item
                              actions={[<Tag color="purple">04.00 pm</Tag>, <Link to ={`/receptionist/appointment/view/${appointment.doctor}/${appointment._id}`}>View</Link>]}
                          >
                              <List.Item.Meta
                                  title={<a href="https://ant.design">{appointment.patientMessage}</a>}
                                  description="with Dr John Doe"
                              />
                          </List.Item>
                      )}
                />,

            </Card>,
        </div>
    )
}

export default PendingAppointment;