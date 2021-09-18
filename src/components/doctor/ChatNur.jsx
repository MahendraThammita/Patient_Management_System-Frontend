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
import ChatNurTH from './ChatNurTH';

const socket = io.connect("http://localhost:8000")

const { Option } = Select
const { TextArea } = Input;
const { Search } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  

class ChatNur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDocs: [],
            username: '',
            room: '',
            recent: [],
            selItem : {},
            name : '',
            pMessage : []
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
            user2: value,
            userType : 'nurse'
        }
        socket.emit("join_room_nurse", roomData)
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    componentDidMount() {

        this.setState({username: window.localStorage.getItem('user_id'), name: window.localStorage.getItem('name')})
        fetch('http://localhost:8000/doctorA/chat/all-nurses', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ allDocs: data })
        })


        //fetch recent chats
        if(window.localStorage.getItem('user_type') === 'doctor'){
            fetch('http://localhost:8000/doctorA/chat/recent/' +  window.localStorage.getItem('user_id') + "/nurse", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => {
                console.log("nurses" + JSON.stringify(data));
                this.setState({ recent: data })
            })
        }else if(window.localStorage.getItem('user_type') === 'nurse'){
            fetch('http://localhost:8000/doctorA/chat/recent/nurse/' +  window.localStorage.getItem('user_id') + "/nurse", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem('token')
                }
            }).then(res => res.json()).then(data => {
                console.log("nurses" + JSON.stringify(data));
                this.setState({ recent: data })
            })
        }
        

        
    }

    passRecentChat = (item) =>{
        console.log(item.message);
        this.setState({selItem : item, pMessage : item.message})

        const roomData = {
            room_id: item.roomId,
            user1: window.localStorage.getItem('name'),
            user2: item.user1
        }
        socket.emit("join_room_recent", roomData)
    }



    render() {
        return (
            <div>

                <Form.Item
                    label="Please select the user"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    hidden={window.location.pathname === '/Nurse-chat' ? true : false}
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
                                    <Option value={item.Fname}>{item.Fname + " " + item.Lname}</Option>
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
                                    <div onClick={() => this.passRecentChat(item)} style={{cursor : "pointer"}}>
                                        <Comment

                                            author={<a>{item.user1 === this.state.name ? item.user2 : item.user1}</a>}
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
                        <ChatNurTH socket={socket} username={this.state.username} room={this.state.room} selItem={this.state.selItem} name={this.state.name} pmessage={this.state.pMessage}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChatNur;