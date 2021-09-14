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
  

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onSearch = value => console.log(value);

    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    onSearch = (val) => {
        console.log('search:', val);
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
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>

                <Row>
                    <Col span={6}>
                        <Card title="Recent Chats" >
                            <Comment

                                author={<a>Han Solo</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }

                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />

                            <Comment

                                author={<a>Han Solo</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }

                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        </Card>
                    </Col>

                    <Col span={1}>

                    </Col>

                    <Col span={17}>
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

                            <Comment
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                        //submitting={submitting}
                                        //value={value}
                                    />
                                }
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Chat;