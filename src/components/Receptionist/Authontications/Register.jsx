import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button } from 'antd';
import '../../../assets/css/uditha.css'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReceptionistRegister = () => {

    const [employeeID, setEmpID] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })


    const onFinish = (e) => {


        const formData = new FormData();
        formData.append("employeeID",employeeID);
        formData.append("mobileNumber",mobile);
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
        <Form {...layout} style={{marginLeft:"20%"}}  onFinish={onFinish} >
            <Form.Item >
                <Input placeholder="Employee ID" onChange={(e) => {setEmpID(e.target.value)}} />
            </Form.Item>

            <Form.Item>
                <Input placeholder="Mobile Number" onChange={(e) => {setMobile(e.target.value)}} />
            </Form.Item>

            <Form.Item >
                <Input placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
            </Form.Item>

            <Form.Item >
                <Input placeholder="Password" type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>

        </Form>
        </div>
    );
};

export default ReceptionistRegister;