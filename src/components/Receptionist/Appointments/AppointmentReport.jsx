import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button,  Card, Avatar, Space, List, Skeleton , Tag } from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";

const AppointmentReport = () => {

    const data = [
        {
            title: 'Mr Leo Doe',
        },
        {
            title: 'Mr Leo Doe',
        },
        {
            title: 'Mr Leo Doe',
        }
    ];


    const { Search } = Input;

    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/doctor";
        axios.get(url).then((res) => {

            setAppointments(res.data);

        })
    })

    const onSearch = value => console.log(value);

    return(
        <div style={{marginLeft: '20px'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Current Appointments" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:500 }}
                cover={
                    <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1624969862293-b749659ccc4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >


                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (

                        <List.Item
                            actions={[<Tag color="purple">04.00 pm</Tag>, <a key="list-loadmore-more">View</a>]}
                        >
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="with Dr John Doe"
                            />
                        </List.Item>
                    )}
                />,

            </Card>,
        </div>
    )
}

export default AppointmentReport;