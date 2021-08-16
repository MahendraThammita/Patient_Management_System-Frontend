import React, { Component } from 'react'
import { Row, Layout , Typography} from 'antd';
import 'antd/dist/antd.css';
import '../../../assets/css/mahen_general.css';

const { Title } = Typography;
const { Content } = Layout;

export default class OverviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            h : '',
            m : '',
            s : ''
        }
    }

    componentDidMount(){
        this.startTime()
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
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 24,
                        paddingBottom: 24,
                        margin: 16,
                        minHeight:330
                    }}
                >
                    
                    <Row justify='start'>
                        <Title type="secondary" strong level={3}>Current Time </Title>
                    </Row>
                    <Row justify='start'>
                        <Title strong level={1}>{this.state.h + ":" + this.state.m + ":" + this.state.s} </Title>
                    </Row>
                    <Row justify='start'>
                        <Title type="secondary" strong level={3}>Total Patients </Title>
                    </Row>
                    <Row justify='start'>
                        <Title strong level={1}>1528 </Title>
                    </Row>
                </Content>
            </div>
        )
    }
}
