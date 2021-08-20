import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button, Avatar, Select, Switch   } from 'antd';
import '../../assets/css/uditha.css'
import TimeSlots from "./TimeSlots";
import axios from "axios";
import {useHistory,useParams} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const DoctorProfile = () => {

    const  history = useHistory();
    const params = useParams();
    const userID = params.userID;

    const [doctorID, setDoctorID] = useState();
    const [fullName, setFullname] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [username, setUsername] = useState();
    const [specialty, setSpecialty] = useState();
    const [doctor_image, setImage] = useState();
    const [status, setStatus] = useState();
    const [check, setCheck] = useState();

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { Option } = Select;

    useEffect(() => {
        document.body.style.backgroundColor = "whiteSmoke"
    })

    useEffect(() => {
        const url = "http://localhost:8090/doctor/" + userID ;
        axios.get(url).then((res) => {

            setDoctorID(res.data.doctor[0]._id);
            setFullname(res.data.doctor[0].fullName);
            setUsername(res.data.doctor[0].username);
            setEmail(res.data.doctor[0].email);
            setMobile(res.data.doctor[0].mobileNumber);
            setSpecialty(res.data.doctor[0].specialty);
            setStatus(res.data.doctor[0].status);
            setPreview("http://localhost:8090/" + res.data.doctor[0].profileImage);
            if(res.data.doctor[0].status == "In"){
                setCheck(true);
            }
            else{
                setCheck(false)
            }


        })
    },[])

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
        formData.append('profileImage', doctor_image);
        formData.append('status', status);


        const url = "http://localhost:8090/doctor/update/" + doctorID;
        axios.put(url, formData).then((res) => {
            if(res.data.status === 200){

                alert('Doctor profile updated!')
                history.push('/receptionist-dashboard');
            }
            else if(res.data.status === 400){
                alert("Something went wrong");
            }
            else{
                alert("Something went wrong");
            }
        })
    };

    function onChange(checked) {

        if(checked === false){
            setStatus('Out');
            setCheck(false);
        }
        else{
            setStatus('In');
            setCheck(true);
        }
    }

    function onDelete() {
        const url = "http://localhost:8090/doctor/delete/" + doctorID;
        axios.delete(url).then((res) => {
            if (res.data.status === 200){
                alert('Doctor Removed');
                history.push('/receptionist-dashboard');
            }
            else{
                alert('Something Went Wrong!')
            }
        }
    ).catch((err) => {
            console.log(err);
        })}

    return (

        <div>
            <TimeSlots doctorID={doctorID}/>

            <div className="uditha-left-form-container">

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Doctor Profile"
                    extra={ [ <p>Doctor is {status} </p>,<Switch checked={check} onChange={onChange}/>]}

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
                        <Input placeholder="Full Name" value={fullName} onChange={(e) => {setFullname(e.target.value)}} />
                    </Form.Item>

                    <Form.Item>
                        <Input placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </Form.Item>

                    <Form.Item>
                        <Input placeholder="Mobile Number" value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
                    </Form.Item>

                    <Form.Item>
                        <Input placeholder="Mobile Number" value={specialty} onChange={(e) => {setMobile(e.target.value)}} />
                    </Form.Item>

                    <Form.Item name="specialty">
                        <Select
                            placeholder="Specialty"
                            onChange={onSpecialtyChange}
                            allowClear
                            initialValues={specialty}
                        >
                            <Option value="ENT">ENT</Option>
                            <Option value="other">other</Option>
                            <Option value="fhgj">fhgj</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Input placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                        <Button danger onClick={onDelete} style={{marginLeft:'10px'}} type="primary" htmlType="submit">
                            Remove
                        </Button>

                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default DoctorProfile;