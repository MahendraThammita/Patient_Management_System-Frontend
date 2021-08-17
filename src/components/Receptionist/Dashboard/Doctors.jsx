import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button,  Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../../../assets/css/uditha.css'

const Doctors = () => {

    const { Meta } = Card;
    const { Search } = Input;

    const onSearch = value => console.log(value);

    return(
        <div style={{float:"left", marginLeft: '60px', marginTop:'5%'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Doctors" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:500 }}
                cover={
                    <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                />
            </Card>,
        </div>
    )
}

export default Doctors;