import React, { Component } from 'react'
import { Layout } from 'antd';

import Logo from './../../assets/img/pmslogo.png'
import Logo2 from './../../assets/img/outlined logo.png'


const { Header } = Layout;

class PatientLogin extends Component {
  render() {
    return (

      <div style={{backgroundColor:"#EDEDED"}}>

        <Header className="site-layout-background" style={{ padding: "1.2%", display:"flex"}} >
          <img src={Logo} alt="" style={{marginLeft:"2%", marginRight:"2%"}} /> 
            <h5 style={{color:"white",marginTop:"0.1%"}}>Patient Management System</h5>
            {/* <h6 style={{color:"white"}}>Logout</h6> */}
        </Header>

        <div className="log-card" style={{width:"80%", margin:"3% 10% 5% 10%", backgroundColor:"white", borderRadius:"10%", padding:"3%"}}>
          <div className="heading" style={{display:"flex"}}>
            <h2 style={{marginTop:"1.5%"}}>Welcome back to</h2>
            <img src={Logo2} alt="" style={{width:"150px", marginLeft:"3%"}}/>
          </div>
        </div>
        
      </div>
    )
  }
}

export default PatientLogin
