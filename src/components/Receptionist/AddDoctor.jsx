import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button, Avatar, Select  } from 'antd';
import '../../assets/css/uditha.css'
import TimeSlots from "./TimeSlots";
import axios from "axios";
import {useHistory} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const AddDoctor = () => {

    const  history = useHistory();

    const [doctorID, setDoctorID] = useState();
    const [fullName, setFullname] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [specialty, setSpecialty] = useState();
    const [doctor_image, setImage] = useState();

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { Option } = Select;

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


    const onSpecialtyChange = (value) => {
       setSpecialty(value);
        }

    const onFinish = (e) => {

        const formData = new FormData();
        formData.append("doctorID",doctorID);
        formData.append("fullName",fullName);
        formData.append("email",email);
        formData.append("mobileNumber",mobile);
        formData.append("specialty",specialty);
        formData.append("username",username);
        formData.append("password",password);
        formData.append('profileImage', doctor_image);


        const url = "http://localhost:8090/doctor/add";
        axios.post(url, formData).then((res) => {
            if(res.data.status === 201){
                history.push("/receptionist-dashboard");
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
            <TimeSlots/>

        <div className="uditha-left-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Add Doctor to System"

            />

            <Avatar style={{marginBottom:'10px', marginRight:'5px'}}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={preview}
            />

            <input type="file" onChange={onSelectFile}/>

            <Form {...layout}  onFinish={onFinish} >
                <Form.Item>
                    <Input placeholder="Doctor ID" onChange={(e) => {setDoctorID(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Full Name" onChange={(e) => {setFullname(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Mobile Number" onChange={(e) => {setMobile(e.target.value)}} />
                </Form.Item>

                <Form.Item name="specialty"  rules={[{ required: true }]}>
                    <Select
                        placeholder="Specialty"
                        onChange={onSpecialtyChange}
                        allowClear
                    >
                        <Option value="ENT">ENT</Option>
                        <Option value="other">other</Option>
                        <Option value="fhgj">fhgj</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Password" type={"password"} onChange={(e) => {setPassword(e.target.value)}} />
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