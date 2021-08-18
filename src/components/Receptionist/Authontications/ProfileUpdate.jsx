import React, {useEffect, useState} from "react";
import {Button, Form, Input, PageHeader} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {useHistory, useParams } from "react-router-dom";

;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReceptionistProfile = (props) => {

    const  history = useHistory();
    const params = useParams();

    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const userID = params.userID;

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })


    const onFinish = (e) => {

        const formData = {
            mobileNumber: mobile,
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        const url = "http://localhost:8090/receptionist/update/" + userID;
        axios.put(url, formData).then((res) => {
            if(res.data.status === 200){
                history.push("/receptionist-dashboard");
            }
            else if(res.data.status === 401){
                alert("Incorrect Password");
            }
            else{
                alert("Something went wrong");
            }
        })
    };

    return (

        <div className="uditha-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="My Profile"
                subTitle="Update your profile"

            />
            <Form {...layout} style={{marginLeft:"20%"}}  onFinish={onFinish} >

                <Form.Item>
                    <Input placeholder="Mobile Number" onChange={(e) => {setMobile(e.target.value)}} />
                </Form.Item>

                <Form.Item >
                    <Input placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
                </Form.Item>

                <Form.Item >
                    <Input placeholder="Old Password" type={"password"} onChange={(e) => {setOldPassword(e.target.value)}} />
                </Form.Item>

                <Form.Item >
                    <Input placeholder="New Password" type={"password"} onChange={(e) => {setNewPassword(e.target.value)}} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default ReceptionistProfile;