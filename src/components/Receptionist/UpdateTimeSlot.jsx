import React, {useEffect, useState} from "react";
import {Card, Tag, TimePicker, List, Button} from 'antd';
import moment from 'moment';
import '../../assets/css/uditha.css'
import axios from "axios";
import {CloseCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useHistory,useParams} from "react-router-dom";


function UpdateTimeSlots(props){

    const params = useParams();
    const userID = params.userID;

    const [visible, setVisible] = useState("none");
    const [timeSlot, setTime] = useState();
    const [status, setStatus] = useState('Available');
    const [schedule, setSchedule] = useState([]);
    const format = 'HH:mm';
    const doctorID = props.doctorID;

    useEffect(() => {
        const url = "http://localhost:8090/doctor/"+userID;
        axios.get(url).then((res) => {

            setSchedule(res.data.doctor[0].timeSlots);
        })
    },[])

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

            const url = "http://localhost:8090/doctor/add-time-slot/"+userID;
            axios.post(url,data).then((res) => {
                if(res.data.status === 201){
                    const url = "http://localhost:8090/doctor/"+userID;
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
        setVisible("");
    }

    const onDelete = (timeSlot) => {
        const url = "http://localhost:8090/doctor/" + userID+ "/delete-time-slot/"+timeSlot;
        axios.delete(url).then((res) => {
            if(res.data.status === 200){
                alert("Removed");
            }
            else{
                alert("Something went wrong");
            }
        })
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
                                actions={[ <Button value={schedule._id} type="primary" danger onClick={e => onDelete(e.target.value)}>Remove</Button> ]}
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

export default UpdateTimeSlots;