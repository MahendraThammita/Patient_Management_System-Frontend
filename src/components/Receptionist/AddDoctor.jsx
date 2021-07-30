import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button } from 'antd';
import '../../assets/css/uditha.css'
import TimeSlots from "./TimeSlots";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const AddDoctor = () => {

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

        <div>
            <TimeSlots/>

        <div className="uditha-left-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Add Doctor to System"

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
                         Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
        </div>
    );
};

export default AddDoctor;