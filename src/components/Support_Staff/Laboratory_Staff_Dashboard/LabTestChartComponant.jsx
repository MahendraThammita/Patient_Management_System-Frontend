import React, { Component} from 'react'
import {Layout , Row , Typography} from 'antd';
import { Pie } from '@ant-design/charts';

const {Content } = Layout;
const { Title, Text, Link } = Typography;
export default class LabTestChartComponant extends Component {
    render() {
        var data = [
            {
              type: 'Compleated',
              value: 27,
            },
            {
              type: 'New',
              value: 25,
            },
            {
              type: 'Published',
              value: 18,
            },
            {
              type: 'In Progress',
              value: 15,
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
