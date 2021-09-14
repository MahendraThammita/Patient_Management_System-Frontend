import React, { Component } from 'react';
import { Alert } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Form, Button, Checkbox } from 'antd';
import { Row, Col, Card } from 'antd';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import io from 'socket.io-client'
import ChatTh from './ChatTh';

const socket = io.connect("http://localhost:8000")

const { Option } = Select

const { Search } = Input;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDocs: [],
            username: '',
            room: '',
            recent: [],
            selItem : {}
        }
    }
    onSearch = value => console.log(value);

    onChange = (value) => {
        console.log(`selected ${value}`);
        const room_id = Math.random().toString(36).slice(2)

        this.setState({ username: window.localStorage.getItem('user_id'), room: room_id })

        const roomData = {
            room_id: room_id,
            user1: window.localStorage.getItem('name'),
            user2: value
        }
        socket.emit("join_room", roomData)
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    componentDidMount() {
        fetch('http://localhost:8000/doctorA/chat/all-docs', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ allDocs: data })
        })


        //fetch recent chats

        fetch('http://localhost:8000/doctorA/chat/recent/' + window.localStorage.getItem('user_id'), {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ recent: data })
        })
    }



    render() {
        return (
            <div>

                <Form.Item
                    label="Please select the user"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.state.allDocs.map(item => {
                            if (item.fullName !== window.localStorage.getItem('name')) {
                                return (
                                    <Option value={item.fullName}>{item.fullName}</Option>
                                )
                            }
                        })}
                    </Select>
                </Form.Item>

                <Row>
                    <Col span={6}>
                        <Card title="Recent Chats" >
                            {this.state.recent.map(item => {
                                return (
                                    <div onClick={() => this.setState({selItem : item})} style={{cursor : "pointer"}}>
                                        <Comment

                                            author={<a>{item.user2}</a>}
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"

                                                />
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </Card>
                    </Col>

                    <Col span={1}>

                    </Col>

                    <Col span={17}>
                        <ChatTh socket={socket} username={this.state.username} room={this.state.room} selItem={this.state.selItem}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Chat;