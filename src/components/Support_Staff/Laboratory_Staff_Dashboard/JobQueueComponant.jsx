import React, { Component } from 'react'
import {Row, Layout, Typography, Divider} from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';
import JobQueueItemComponant from './JobQueueItemComponant'
import moment from "moment";

const { Title} = Typography;
const {Content } = Layout;

export default class JobQueueComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {},
            TestOne: {},
            TestTwo:{}
        }
    }
    componentDidMount() {
        //fetch appointments
        fetch("http://localhost:8090/tests/getTestsForLabStaff", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem('auth-token')
          }
        }).then(res => res.json()).then(data => {
          console.log(data);
          if (data.message === 'Authentication failed!') {
            window.location.replace('/staff-login')
          }
          this.setState({ Data: data , TestOne: data.sortedtodayTests[0] , TestTwo: data.sortedtodayTests[1] })
          console.log("Appointments in parent", this.state.Data)
        })
      }
    render() {
        if(this.state.TestOne === [] && this.state.TestOne === [])
            return null;
        return (
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 16,
                    }}
                >
                    <Row justify='start'>
                        <Title level={3}>Job Queue ({moment().format("DD-MM-YYYY")})</Title>
                        <Divider />
                    </Row>
                    <JobQueueItemComponant test={this.state.TestOne}/>
                    <JobQueueItemComponant test={this.state.TestTwo}/>
                </Content>
            </div>
        )
    }
}
