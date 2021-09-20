import React, {useEffect, useState} from "react";
import {Avatar, Button, Form, Input, PageHeader} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {useHistory, useParams } from "react-router-dom";
import RecepPHeader from "../commonComponents/RecepHeader";
import SideMenu from "../commonComponents/Menu";

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
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [profileImage, setImage] = useState();


    const userID = params.userID;

    useEffect(() => {
        document.body.style.backgroundColor = "white"

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

    useEffect(() => {

        if(!localStorage.getItem('auth-token')){
            history.push("/receptionist-login");
        }
        else {
            const url = "http://localhost:8090/receptionist/" + userID;
            let config = {
                headers: {
                    'auth_token': localStorage.getItem('auth-token')
                }
            }
            axios.get(url, config).then((res) => {

                setUsername(res.data.user.username);
                setMobile(res.data.user.mobileNumber);
                setPreview("http://localhost:8090/receptionist/" + res.data.user.profileImage);

            })
        }
    },[])


    const onFinish = (e) => {

        const formData = {
            mobileNumber: mobile,
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword,
            profileImage: profileImage

        }

        const url = "http://localhost:8090/receptionist/update/" + userID;
        let config = {
            headers: {
                'auth_token':  localStorage.getItem('auth-token')
            }
        }
        axios.put(url, formData, config).then((res) => {
            console.log(profileImage);
            if(res.data.status === 200){
                alert('Profile updated successfully')
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

        <div>
            <div>
                <RecepPHeader />
            </div>
            <SideMenu/>
        <div style={{boxShadow: '0 15px 25px rgba(0,0,0,.8)', marginTop:'10px'}} className="uditha-form-container">

            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="My Profile"
                subTitle="Update your profile"

            />

            <div className="uditha-dashboard-align">
                <Avatar className="uditha-avatar-align"
                        size={80}
                        src={preview}
                />

                <input  style={{marginTop:'25px'}} type="file" onChange={onSelectFile}/>
            </div>

            <Form {...layout} style={{marginLeft:"20%"}}  onFinish={onFinish} >

                <Form.Item>
                    <Input placeholder="Mobile Number" value={mobile} onChange={(e) => {setMobile(e.target.value)}} />
                </Form.Item>

                <Form.Item >
                    <Input placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
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
        </div>
    );
};

export default ReceptionistProfile;