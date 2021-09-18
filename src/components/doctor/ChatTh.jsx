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
const socket = io.connect("http://localhost:8090")

const { Option } = Select

const { Search } = Input;

function ChatTh({ socket, username, room, selItem, name, pmessage }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {

        console.log(selItem);

        if (currentMessage !== "") {
            const messageData = {
                room: room != "" ? room : selItem.roomId,
                author: name,
                name: name,
                message: currentMessage,
                chatThId: selItem._id,
                time: new Date(Date.now())
            }

            await socket.emit("send_message", messageData)
            setMessages((list) => [...list, messageData])
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessages((list) => [...list, data])
        })

        console.log("past messages : " + JSON.stringify(selItem['message']))

        setMessages(pmessage)

    }, [socket, selItem, pmessage])

    return (

        <Card title="John Doe" >
            <div style={{ height: '300px', overflowY :'scroll' }}>
                {messages.map(item => {
                    return (

                        <Comment

                            author={<a>{item.author}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <p>
                                    {item.message}
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')} </span>
                                </Tooltip>
                            }
                        />

                    )
                })}

            </div>


            <TextArea rows={4} onChange={(event) => setCurrentMessage(event.target.value)} />
            <br />
            <br />
            <Button type="primary" block onClick={sendMessage}>SEND REPLY</Button>
        </Card>
    )
}

export default ChatTh;