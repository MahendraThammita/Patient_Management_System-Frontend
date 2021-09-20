import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Row, Col, Card } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import SiteFooter from '../Footer/SiteFooter';
import PHeader from '../PageHeader/PHeader';

const { Option } = Select;
const { Header, Content, Footer } = Layout;

class DocTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadings: [],
      h : '',
      m : '',
      s : '',
      data : [],
      email : '',
      password : ''
    }
  }

  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({email : value})
  }

  onChangeText = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }

  onBlur = () => {
    console.log('blur');
  }

  onFocus = () => {
    console.log('focus');
  }

  onSearch = (val) => {
    console.log('search:', val);
  }


  handleSubmit = () =>{
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[0] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[0] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);

    //data
    const data = {
      email : this.state.email,
      password : this.state.password
    }

    fetch('http://localhost:8090/doctor/signin',{
      method : 'POST',
      headers : {
        'Content-type' : 'Application/json'
      },
      body : JSON.stringify(data)
    }).then(res =>res.json()).then(data =>{
      if(data.token){
        window.localStorage.setItem('token',data.token)
        window.localStorage.setItem('user_id',data.msg._id)
        window.localStorage.setItem('name',data.msg.fullName)
        window.localStorage.setItem('user_type','doctor')
        console.log(data.msg._id);
        window.location.replace('/doctor/dashboard')
      }
      console.log(data);
    }).catch(err =>{
      console.log(err);
    })

  }

  fetchUsernames = () =>{
    fetch('http://localhost:8090/doctorA/get-my-name').then(res => res.json()).then(data =>{
      this.setState({data : data})
    }).catch(err =>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.fetchUsernames()
  }


  render() {
    const { loadings } = this.state;
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Header>
          
        </Header>
        <PHeader/>
        <Content style={{ padding: '50px 50px' }}>
          <div className="site-layout-content" style={{backgroundColor : 'transparent'}}>
            <Row>
              <Col span={8}></Col>
              <Col span={8}>
                <Card style={{ width: '100%' }}>
                  <Avatar style={{ backgroundColor: '#87d068', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }} icon={<UserOutlined />} size={{ xs: 24, sm: 32, md: 40, lg: 90, xl: 90, xxl: 100 }} />

                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                  >

                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select your username"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.state.data.map(item =>{
                          return(<Option value={item.email}>{item.email}</Option>)
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password name="password" onChange={this.onChangeText} />
                    </Form.Item>

                    <Button type="primary" loading={loadings[0]} onClick={this.handleSubmit} block>
                      LOG IN
                    </Button>
                  </Form>

                </Card>
              </Col>
              <Col span={8}></Col>
            </Row>
          </div>
        </Content>
        <SiteFooter/>
      </Layout>
    );
  }
}

export default DocTemplate;