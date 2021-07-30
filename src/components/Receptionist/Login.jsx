import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button } from 'antd';
import '../../assets/uditha.css'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReceptionistLogin = () => {

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "#282c34"
    })


    const onFinish = (e) => {


        const formData = new FormData();
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
                title="Sign In"
                subTitle="Sign In as a Receptionist"

            />
            <Form {...layout}  onFinish={onFinish} >
                <Form.Item label="Username">
                    <Input onChange={(e) => {setUsername(e.target.value)}} />
                </Form.Item>

                <Form.Item label="Password">
                    <Input type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default ReceptionistLogin;