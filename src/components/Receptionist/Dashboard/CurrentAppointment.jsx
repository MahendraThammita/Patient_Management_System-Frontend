import React, {useEffect, useState} from "react";
import { Form, Input, PageHeader , Button,  Card, Avatar, Space, List, Skeleton , Tag } from 'antd';
import '../../../assets/css/uditha.css'
import axios from "axios";

const CurrentAppointment = () => {

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];


    const { Search } = Input;

    const[doctors, setList] = useState([]);
    const[initLoading, setInitLoading] = useState();

    useEffect(() => {
        const url = "https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo";
        axios.get(url).then((res) => {

          setList(res.data.results);
          setInitLoading(false);

        })
    })

    const onSearch = value => console.log(value);

    return(
        <div style={{marginLeft: '20px', marginTop:'5%'}}>
            <Search style={{marginBottom: '5px'}} placeholder="Search Current Appointments" onSearch={onSearch} enterButton />
            <Card

                style={{ width: 400, height:500 }}
                cover={
                    <img
                        alt="example"
                        src="https://images.unsplash.com/photo-1624969862293-b749659ccc4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
                    />
                }
            >


                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (

                        <List.Item
                            actions={[<Tag color="purple">04.00 pm</Tag>, <a key="list-loadmore-more">View</a>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />,

            </Card>,
        </div>
    )
}

export default CurrentAppointment;