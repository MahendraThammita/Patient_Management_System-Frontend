import React, {useEffect, useState} from "react";
import Doctors from "./Doctors";
import CurrentAppointment from "./CurrentAppointment";
import '../../../assets/css/uditha.css'
import PendingAppointment from "./PendingAppointment";
import {Link, useHistory} from "react-router-dom";
import NavBar from "../NavBar";


const Dashboard = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })

    return(
        <div className="uditha-dashboard-align">

            <Doctors/>
            <CurrentAppointment/>
            <PendingAppointment/>
        </div>
    )

}

export default Dashboard;