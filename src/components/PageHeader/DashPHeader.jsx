import React, { Component } from 'react';
import { PageHeader, Button, Descriptions, Typography } from 'antd';
import { Avatar } from 'antd';
import { QuestionCircleTwoTone, NotificationTwoTone } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

const { Title } = Typography;




class DashPHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout = () => {
        console.log('akila');
        window.localStorage.clear()
        window.localStorage.removeItem('token')
        window.location.replace('/doctor')
    }

    menu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.logout}>
                    <a target="_blank" rel="noopener noreferrer">
                        <Button block type="primary" danger onClick={this.logout}>LOG OUT</Button>
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        Profile
                    </a>
                </Menu.Item>
            </Menu>
        )
    }
    render() {
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Doctor Dashboard"
                    extra={[
                        <QuestionCircleTwoTone style={{ fontSize: '25px', padding: '0 10px 0 10px' }} />,
                        <NotificationTwoTone style={{ fontSize: '25px', padding: '0 10px 0 10px' }} />,
                        <Dropdown overlay={this.menu} placement="bottomRight" arrow>
                            <Avatar style={{ margin: "0 10px 0 20px" }}>U</Avatar>
                        </Dropdown>,

                    ]}
                >
                </PageHeader>
            </div>
        );
    }
}

export default DashPHeader;