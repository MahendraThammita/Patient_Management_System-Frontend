import React, {useEffect, useState} from "react";
import Doctors from "./Doctors";
import CurrentAppointment from "./CurrentAppointment";
import '../../../assets/css/uditha.css'
import PendingAppointment from "./PendingAppointment";
import {Link, useHistory} from "react-router-dom";
import SideMenu from "../commonComponents/Menu";
import DashPHeader from "../../PageHeader/DashPHeader";
import {Layout} from "antd";
import RecepPHeader from "../commonComponents/RecepHeader";
import SiteFooter from "../../Footer/SiteFooter";
import ClockBar from "../commonComponents/Clock";
//import NavBar from "../NavBar";


const Dashboard = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
    })

    return(
        <div>
            <div>
                <RecepPHeader />
            </div>
        <div className="uditha-dashboard-align">
            <SideMenu/>
            <Doctors/>
            <CurrentAppointment/>
            <PendingAppointment/>
        </div>
            <SiteFooter />
        </div>
    )

}

export default Dashboard;