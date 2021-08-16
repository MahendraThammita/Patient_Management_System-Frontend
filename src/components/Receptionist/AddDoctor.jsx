import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button, Avatar } from 'antd';
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
    const [doctor_image, setImage] = useState("");

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        document.body.style.backgroundColor = "#282c34"
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

            <Avatar style={{marginBottom:'10px', marginRight:'5px'}}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={preview}
            />

            <input type="file" onChange={onSelectFile}/>

            <Form {...layout}  onFinish={onFinish} >
                <Form.Item>
                    <Input placeholder="Full Name" onChange={(e) => {setFullname(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Input placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
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