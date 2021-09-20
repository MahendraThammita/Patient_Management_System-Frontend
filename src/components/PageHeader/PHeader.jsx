import React, { Component } from 'react';
import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';

class PHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            h : '',
            m : '',
            s : '',
            doc : 0,
            pat : 0

        }
    }

    componentDidMount(){
        this.startTime()

        fetch('http://localhost:8090/doctorA/get/tot/count')
        .then(res => res.json()).then(data =>{
            console.log(data);
            this.setState({doc : data.doc, pat : data.pat})
        })
    }

    startTime = () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.setState({h,m,s})
        setTimeout(this.startTime, 1000);
      }
    
      checkTime = (i) => {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
      }
    render() {
        return (
            <PageHeader
                onBack={() => window.history.back()}
                title="PMS"
                tags={<Tag color="green">Running</Tag>}
                subTitle="Welcome to the PMS patinet managemnt systems"
            >
                <Row>
                    <Statistic title="Current Time" value={this.state.h + ":" + this.state.m + ":" + this.state.s} />
                    <Statistic
                        title="Total Patients"
                        prefix=""
                        value={this.state.pat}
                        style={{
                            margin: '0 32px',
                        }}
                    />
                    <Statistic title="Total Doctors" prefix="" value={this.state.doc} />
                </Row>
            </PageHeader>
        );
    }
}

export default PHeader;