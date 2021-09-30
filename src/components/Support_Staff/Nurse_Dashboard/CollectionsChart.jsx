import React, { Component } from 'react'
import { Row, Col, Badge , Layout , Typography} from 'antd';
import 'antd/dist/antd.css';
import { Pie } from '@ant-design/charts';
import '../../../assets/css/mahen_general.css';

const { Title, Text } = Typography;
const { Content } = Layout;
export default class CollectionsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ComponantData:{},
        }
    }

    componentDidMount() {
        //fetch pending appointments
        fetch("http://localhost:8090/tests/getSampleCollections_today", {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ ComponantData:data })
        })
    }

    render() {
        var data = [
            {
                type: 'Compleated',
                value: this.state.ComponantData.completePercentage,
            },
            {
                type: 'To be Compleated',
                value: this.state.ComponantData.incompletePercentage,
            },
        ];
        var config = {
            width: 200,
            height: 200,
            padding: 20,
            appendPadding: 0,
            data: data,
            angleField: 'value',
            colorField: 'type',
            color: ['#00B74A', '#cccccc', '#000000'],
            radius: 1,
            innerRadius: 0.7,
            legend: false,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                autoHide: true,
                style: {
                    textAlign: 'center',
                    fontSize: 10,
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
                        fontSize: 32,
                    },
                    content: this.state.ComponantData.completePercentage+'%',
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
                    <Row justify='center'>
                        <Title level={3}>Sample Collections</Title>
                    </Row>
                    <Row justify='space-around' style={{ marginTop: 10 }}>
                        <Col span={22}>
                            <Badge color="#00B74A" /> <Text type="secondary" strong>Compleated </Text>
                        </Col>
                        <Col span={2}>
                            <Text strong>{this.state.ComponantData.testsToComplete} </Text>
                        </Col>
                    </Row>
                    <Row justify='space-around' style={{ marginTop: 10 }}>
                        <Col span={22}>
                            <Badge color="#cccccc" /><Text type="secondary" strong>To be Compleated </Text>
                        </Col>
                        <Col span={2}>
                            <Text strong>{this.state.ComponantData.compleatedTests}  </Text>
                        </Col>
                    </Row>
                </Content>
            </div>
        )
    }
}
