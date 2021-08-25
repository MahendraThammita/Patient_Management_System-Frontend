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
            <PageHeader  style={{backgroundColor:' #3d5a80', borderRadius:'50%'}}
                title={<Clock/>}
            >
            </PageHeader>
        </div>
    );

}

export default ClockBar;