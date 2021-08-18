import React, {useEffect, useState} from "react";
import {Card, Tag, TimePicker, List, Avatar} from 'antd';
import moment from 'moment';
import '../../assets/css/uditha.css'
import axios from "axios";
import {CloseCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';


function TimeSlots(props){

    const [visible, setVisible] = useState("none");
    const [timeSlot, setTime] = useState();
    const [status, setStatus] = useState('Available');
    const [schedule, setSchedule] = useState([]);
    const format = 'HH:mm';
    const doctorID = props.doctorID;

    function onChange(time, timeString) {

        if(timeString === ""){
            alert('Time cannot be empty');
        }
        else{
            setTime(timeString);
            const data = {
                timeSlot: timeString,
                status: status
            }

            const url = "http://localhost:8090/doctor/add-time-slot/"+doctorID;
            axios.post(url,data).then((res) => {
                if(res.data.status === 201){
                    const url = "http://localhost:8090/doctor/"+doctorID;
                    axios.get(url).then((res) => {

                        setSchedule(res.data.doctor[0].timeSlots);
                    })
                }
                else if(res.data.status === 401){
                    alert("duplicated");
                }
                else{
                    alert("Something went wrong");
                }
            })
        }
        setVisible("none");
    }

    const onAdd = () => {
        if(!doctorID){
            alert("First submit the doctor Details");
        }
        else {
            setVisible("");
        }
    }




    return(

        <div>
        <div className="uditha-site-card-border-less-wrapper">
            <Card title="Time Slots" extra={
                [<Tag onClick={onAdd} color="blue">Add</Tag>,
                    <TimePicker style={{display:visible}} onChange={onChange} defaultValue={moment('00:00', format)} format={format} />]} bordered={false} style={{ width: 300 }}>
                <List
                    itemLayout="horizontal"
                    dataSource={schedule}
                    renderItem={schedule => (

                        <List.Item
                            actions={[<CloseCircleOutlined />]}
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

export default TimeSlots;