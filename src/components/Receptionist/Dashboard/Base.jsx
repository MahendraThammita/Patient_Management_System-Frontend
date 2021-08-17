import React, {useEffect, useState} from "react";
import Doctors from "./Doctors";


const Dashboard = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })

    return(
        <div>
            <Doctors/>
        </div>
    )

}

export default Dashboard;