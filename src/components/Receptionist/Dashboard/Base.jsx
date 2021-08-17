import React, {useEffect, useState} from "react";
import Doctors from "./Doctors";
import CurrentAppointment from "./CurrentAppointment";
import '../../../assets/css/uditha.css'


const Dashboard = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })

    return(
        <div className="uditha-dashboard-align">
            <Doctors/>
            <CurrentAppointment/>
        </div>
    )

}

export default Dashboard;