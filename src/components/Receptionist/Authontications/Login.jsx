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

const ReceptionistLogin = () => {


    const [employeeID, setEmpID] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = "white"
    })


    const onFinish = (e) => {


        const formData = new FormData();
        formData.append("employeeID",employeeID);
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
            <Form {...layout} style={{marginLeft:"20%", marginTop:"10%"}} onFinish={onFinish} >
                <Form.Item>
                    <Input placeholder="Employee ID" onChange={(e) => {setEmpID(e.target.value)}} />
                </Form.Item>

                <Form.Item >
                    <Input placeholder="Password" type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default ReceptionistLogin;