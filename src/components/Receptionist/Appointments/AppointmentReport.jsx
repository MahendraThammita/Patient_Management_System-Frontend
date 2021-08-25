import React, {useEffect, useState} from "react";
import { Input, Button,  Card, Space, List, DatePicker, Tag } from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import { DownloadOutlined } from '@ant-design/icons';

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


    const[appointments, setAppointments] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/doctor";
        axios.get(url).then((res) => {

            setAppointments(res.data);

        })
    })

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    const onSearch = value => console.log(value);

    return(
        <div style={{marginLeft: '5%', marginTop: '10%'}}>

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
                    dataSource={data}
                    renderItem={item => (

                        <List.Item
                            actions={[<Tag color="purple">04.00 pm</Tag>]}
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