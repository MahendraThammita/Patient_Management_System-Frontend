import React, { useState, useEffect } from 'react';
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

const { TextArea } = Input;
const socket = io.connect("http://localhost:8000")  

const { Option } = Select

const { Search } = Input;

function ChatTh({socket,username,room,selItem}){

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState(selItem.message);

    const sendMessage = async () =>{
        if(currentMessage !== ""){
            const messageData = {
                room : room,
                author : username,
                message : currentMessage,
                time : new Date(Date.now())
            }

            await socket.emit("send_message",messageData)
        }
    }

    useEffect(() =>{
        socket.on("receive_message", (data) =>{
            console.log(data);
        })
    }, [socket])

    return(
        <Card title="John Doe" >
                            <Comment

                                author={<a>Han Solo</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <p>
                                      We supply a series of design principles, practical patterns and high quality design
                                      resources (Sketch and Axure), to help people create their product prototypes beautifully
                                      and efficiently.
                                    </p>
                                  }
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />

                            <TextArea rows={4} onChange={(event) => setCurrentMessage(event.target.value)}/>
                            <br />
                            <br />
                            <Button type="primary" block onClick={sendMessage}>SEND REPLY</Button>
                        </Card>
    )
}

export default ChatTh;