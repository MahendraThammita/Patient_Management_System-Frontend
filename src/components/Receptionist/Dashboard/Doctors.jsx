import React, {useEffect, useState} from "react";
import {Form, Input, Button, Card, Avatar, List, Tag} from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

const Doctors = () => {

    const { Search } = Input;
    const[doctors, setDoctors] = useState([]);


    useEffect(() => {
        const url = "http://localhost:8090/doctor";
        axios.get(url).then((res) => {

            setDoctors(res.data.doctors);
        })
    },[])

    const onSearch = value => console.log(value);

    return(
        <div style={{float:"left", marginLeft: '5%', marginTop:'5%'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Doctors" onSearch={onSearch} enterButton />
            <Card
                style={{ width: 400, height:'auto' }}
                cover={
                    <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={doctors}
                    renderItem={doctor => (

                        <List.Item
                            actions={[ <Link to ={`doctor-profile/${doctor._id}`}>
                                <a key="list-loadmore-more">View</a></Link>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={"http://localhost:8090/" + doctor.profileImage} />}
                                title={<a href="https://ant.design">{doctor.fullName}</a>}
                                description={doctor.specialty}
                            />
                        </List.Item>
                    )}
                />,

            </Card>
        </div>
    )
}

export default Doctors;