import React, {useEffect, useState} from "react";
import { Card,Button,TimePicker  } from 'antd';
import moment from 'moment';
import '../../assets/css/uditha.css'


function TimeSlots(){

    const [visible, setVisible] = useState("none");
    const [next, setNext] = useState(false);
    const format = 'HH:mm';

    function onChange(time, timeString) {
        console.log(timeString);
        if(timeString === ""){
            alert('Time cannot be empty');
        }
        setVisible("none");
    }

    const onAdd = () => {
        if(next === true){
            alert("First submit the doctor Details");
        }
        else {
            setVisible("");
        }
    }


    return(

        <div>
        <div className="uditha-site-card-border-less-wrapper">
            <div className="uditha-time-picker" style={{display:visible}}>
                <TimePicker style={{display:visible}} onChange={onChange} defaultValue={moment('00:00', format)} format={format} />
            </div>
            <Card title="Time Slots" extra={<button onClick={onAdd} type="primary">Add New</button>} bordered={false} style={{ width: 300 }}>
                <p>04:00 PM</p>
                <p>04:20 PM</p>
                <p>05:00 PM</p>
            </Card>
        </div>
        </div>

    )
}

export default TimeSlots;