import React, { Component } from 'react';
import { PageHeader, Button, Descriptions, Typography } from 'antd';
import { Avatar } from 'antd';
import {BellOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import Clock from 'react-digital-clock';


const ClockBar = () =>  {


    const  logout = () => {

    }

    return (
        <div>
            <PageHeader  style={{backgroundColor:'blue'}}
                title={<Clock/>}
            >
            </PageHeader>
        </div>
    );

}

export default ClockBar;