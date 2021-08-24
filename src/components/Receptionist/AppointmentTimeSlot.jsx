import React, {useEffect, useState} from "react";
import {Card, Tag, TimePicker, List, Avatar} from 'antd';
import moment from 'moment';
import '../../assets/css/uditha.css'
import axios from "axios";
import {CloseCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useHistory,useParams} from "react-router-dom";


function AppointmentTimeSlots(props){

    const [schedule, setSchedule] = useState([]);
    const doctorID = props.doctorID;

    useEffect(() => {
        const url = "http://localhost:8090/doctor/"+doctorID;
        axios.get(url).then((res) => {

            setSchedule(res.data.doctor[0].timeSlots);
        })
    },[])








    return(

        <div>
            <div className="uditha-site-card-border-less-wrapper" style={{marginTop:'5%'}}>
                <Card title="Time Slots"  bordered={false} style={{ width: 300 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={schedule}
                        renderItem={schedule => (

                            <List.Item
                                actions={[<Tag color="blue">Assign</Tag>]}
                            >
                                <List.Item.Meta
                                    title={<p>{schedule.timeSlot}</p>}
                                />
                            </List.Item>
                        )}
                    />,
                </Card>
            </div>

        </div>

    )
}

export default AppointmentTimeSlots;