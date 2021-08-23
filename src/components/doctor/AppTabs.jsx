import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import SiteFooter from '../Footer/SiteFooter';
import DashPHeader from '../PageHeader/DashPHeader';

import { Statistic, Card, Row, Col, Tabs } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PendingApps from './PendingApps';
import FinApps from './FinApps';
import DecApps from './DecApps';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
class AppTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Pending Appointments" key="1">
                    <PendingApps />
                </TabPane>
                <TabPane tab="Finished Appointments" key="2">
                    <FinApps />
                </TabPane>
                <TabPane tab="Declined Appointments" key="3">
                    <DecApps />
                </TabPane>
            </Tabs>
        );
    }
}

export default AppTabs;