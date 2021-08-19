import React, { Component } from 'react';
import { PageHeader, Button, Descriptions } from 'antd';
import { Avatar } from 'antd';
import { QuestionCircleTwoTone, NotificationTwoTone } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                <Button block type="primary" danger>LOG OUT</Button>
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Profile
            </a>
        </Menu.Item>
    </Menu>
);

class DashPHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Doctor Dashboard"
                    extra={[
                        <QuestionCircleTwoTone style={{ fontSize: '25px', padding:'0 10px 0 10px' }} />,
                        <NotificationTwoTone style={{ fontSize: '25px', padding:'0 10px 0 10px' }} />,
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <Avatar style={{margin:"0 10px 0 20px"}}>U</Avatar>
                        </Dropdown>
                    ]}
                >
                </PageHeader>
            </div>
        );
    }
}

export default DashPHeader;