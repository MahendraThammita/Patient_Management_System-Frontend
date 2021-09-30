import React, { Component } from 'react'
import { Layout, Row, Typography } from 'antd';
import { Pie } from '@ant-design/charts';

const { Content } = Layout;
const { Title, Text, Link } = Typography;
export default class LabTestChartComponant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
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
      this.setState({ Data: data })
      console.log("Appointments in parent", this.state.Data)
    })
  }

  render() {
    var data = [
      {
        type: 'Compleated',
        value: this.state.Data.completedTestPercentage,
      },
      {
        type: 'New',
        value: this.state.Data.newPercentage,
      },
      {
        type: 'Published',
        value: this.state.Data.publishedPercentage,
      },
      {
        type: 'In Progress',
        value: this.state.Data.inProgressPercentage,
      },
    ];
    var config = {
      width: 260,
      height: 260,
      appendPadding: 10,
      data: data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 12,
        },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: 'Tests Overview',
        },
      },
    };
    return (
      <div>
        <Content
          className="site-layout-background"
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 0,
            paddingBottom: 24,
            margin: 16,
          }}
        >
          <Pie {...config} />
          <Row justify='center'><Title level={3}>Lab tests</Title></Row>
        </Content>
      </div>
    )
  }
}
