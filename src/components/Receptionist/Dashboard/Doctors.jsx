import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button,  Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../../../assets/css/uditha.css'

const Doctors = () => {

    const { Meta } = Card;

    return(
        <div style={{float:"left"}}>
            <Card

                style={{ width: 400, height:400 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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