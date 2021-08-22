import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button, Avatar, Select, Switch   } from 'antd';
import '../../assets/css/uditha.css'
import TimeSlots from "./TimeSlots";
import axios from "axios";
import {useHistory} from "react-router-dom";
import SideMenu from "./commonComponents/Menu";

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
    const [status, setStatus] = useState('In');

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
        formData.append("fullName",fullName);
        formData.append("email",email);
        formData.append("mobileNumber",mobile);
        formData.append("specialty",specialty);
        formData.append("username",username);
        formData.append("password",password);
        formData.append('profileImage', doctor_image);
        formData.append('status', status);


        const url = "http://localhost:8090/doctor/add";
        axios.post(url, formData).then((res) => {
            if(res.data.status === 201){
                setDoctorID(res.data.doctor._id);
                alert('Doctor profile saved!')
            }
            else if(res.data.status === 401){
                alert("User Already Exist");
            }
            else{
                alert("Something went wrong");
            }
        })
    };

    function onChange(checked) {

        if(checked === false){
            setStatus('Out');
        }
        else{
            setStatus('In');
        }
    }

    const onSubmit = () => {
        history.push('/receptionist-dashboard')
    }

    return (

        <div>
            <SideMenu/>
            <TimeSlots doctorID={doctorID}/>

        <div className="uditha-left-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Add Doctor to System"
                extra={ [ <p>Doctor is {status} </p>,<Switch defaultChecked onChange={onChange}/>]}

            />

            <div className="uditha-dashboard-align">
            <Avatar className="uditha-avatar-align"
                size={80}
                src={preview}
            />

            <input  style={{marginTop:'25px'}} type="file" onChange={onSelectFile}/>
            </div>

            <Form style={{marginLeft:'20%'}} {...layout}  onFinish={onFinish} >

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

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                    <Button type="primary" htmlType="submit">
                         Save
                    </Button>
                    <Button onClick={onSubmit} style={{marginLeft:'10px'}} type="primary" htmlType="submit">
                        Submit schedule
                    </Button>
                </Form.Item>

            </Form>
        </div>
        </div>
    );
};

export default AddDoctor;