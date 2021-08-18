import React, {useEffect, useState} from "react";
import Doctors from "./Doctors";
import CurrentAppointment from "./CurrentAppointment";
import '../../../assets/css/uditha.css'
import PendingAppointment from "./PendingAppointment";
import {Link, useHistory} from "react-router-dom";


const Dashboard = () => {

    let username = (localStorage.getItem('user-name'));
    let userid = (localStorage.getItem('user-id'));

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })

    return(
        <div className="uditha-dashboard-align">
            <h2>{username}</h2>
            <Link to ={`receptionist-profile/${userid}`}>
                <h2>{userid}</h2>
            </Link>
            <Doctors/>
            <CurrentAppointment/>
            <PendingAppointment/>
        </div>
    )

}

export default Dashboard;