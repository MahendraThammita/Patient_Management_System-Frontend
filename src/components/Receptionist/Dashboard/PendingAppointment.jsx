import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button,  Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../../../assets/css/uditha.css'

const PendingAppointment = () => {

    const { Meta } = Card;
    const { Search } = Input;

    const onSearch = value => console.log(value);

    return(
        <div style={{marginLeft: '20px', marginTop:'5%'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Pending Appointments" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:500 }}
                cover={
                    <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1494599948593-3dafe8338d71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >
                <Meta
                    title="Mr Leo Doe"
                />
            </Card>,
        </div>
    )
}

export default PendingAppointment;