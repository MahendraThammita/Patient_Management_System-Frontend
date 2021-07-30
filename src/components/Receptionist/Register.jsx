import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button } from 'antd';
import '../../assets/css/uditha.css'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReceptionistRegister = () => {

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "#282c34"
    })


    const onFinish = (e) => {


        const formData = new FormData();
        formData.append("fullname",fullName);
        formData.append("email",email);
        formData.append("username",username);
        formData.append("password",password);

        console.log(formData);

        const url = "";
    };

    return (

        <div className="uditha-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Sign Up"
                subTitle="Sign Up as a Receptionist"

            />
        <Form {...layout}  onFinish={onFinish} >
            <Form.Item label="Full Name">
                <Input onChange={(e) => {setFullname(e.target.value)}} />
            </Form.Item>

            <Form.Item label="Email">
                <Input onChange={(e) => {setEmail(e.target.value)}} />
            </Form.Item>

            <Form.Item label="User Name">
                <Input onChange={(e) => {setUsername(e.target.value)}} />
            </Form.Item>

            <Form.Item label="Password">
                <Input type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>

        </Form>
        </div>
    );
};

export default ReceptionistRegister;