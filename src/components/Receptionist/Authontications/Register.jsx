import React, {useEffect, useState} from "react";
import {Form, Input, PageHeader, Button, Avatar} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import RecepPHeader from "../commonComponents/RecepHeader";
import SiteFooter from "../../Footer/SiteFooter";

;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ReceptionistRegister = () => {

    const  history = useHistory();

    const [employeeID, setEmpID] = useState();
    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [profileImage, setImage] = useState();

    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
    })

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
        setImage(e.target.files[0])
    }


    const onFinish = (e) => {

        const formData = new FormData();
        formData.append("employeeID",employeeID);
        formData.append("mobileNumber",mobile);
        formData.append("username",username);
        formData.append("password",password);
        formData.append('profileImage', profileImage);

        const url = "http://localhost:8090/receptionist/register";
        axios.post(url, formData).then((res) => {
            if(res.data.status === 201){
                history.push("/receptionist-login");
            }
            else if(res.data.status === 401){
                alert("User Already Exist");
            }
            else{
                alert("Something went wrong");
            }
        })
    };

    return (
        <div>
            <div>
                <RecepPHeader />
            </div>
            <div style={{boxShadow: '0 15px 25px rgba(0,0,0,.8)', marginTop:'10px'}} className="uditha-form-container">

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Sign Up"
                    subTitle="Sign Up as a Receptionist"

                />
            <div className="uditha-dashboard-align">
                <Avatar className="uditha-avatar-align"
                        size={80}
                        src={preview}
                />

                <input  style={{marginTop:'25px'}} type="file" onChange={onSelectFile}/>
            </div>

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

                    <Link to="/receptionist-login">
                        <Button type="link" htmlType="button" >
                            Already have an account? Login
                        </Button>
                    </Link>
                </Form.Item>

            </Form>
        </div>

        </div>
    );
};

export default ReceptionistRegister;