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
    const appointmentID = props.appointmentID;

    const  history = useHistory();

    useEffect(() => {
        const url = "http://localhost:8090/doctor/"+doctorID;
        axios.get(url).then((res) => {

            setSchedule(res.data.doctor[0].timeSlots);
        })
    },[]);

    const updateTime = (time) => {

        const data = {
            "time": time
        }

        const url = "http://localhost:8090/receptionist/appointments/update/"+appointmentID;
        axios.put(url, data).then((res) => {
            if(res.data.status === 200){
                alert("Updated");
            }
            else{
                alert("Something went wrong");
            }
        })

        history.push('/receptionist-dashboard')
    }


    return(

        <div>
            <div className="uditha-site-card-border-less-wrapper" style={{marginTop:'7%'}}>
                <Card title="Time Slots"  bordered={false} style={{ width: 300 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={schedule}
                        renderItem={schedule => (

                            <List.Item
                                actions={[<button value={schedule.timeSlot} onClick={e => updateTime(e.target.value)} color="blue">Assign</button>]}
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