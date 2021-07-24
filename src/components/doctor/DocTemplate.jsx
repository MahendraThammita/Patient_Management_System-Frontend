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
      s : ''
    }
  }

  onChange = (value) => {
    console.log(`selected ${value}`);
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

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };



  render() {
    const { loadings } = this.state;
    return (
      <Layout className="layout" style={{ height: "100vh" }}>
        <Header>
          <div className="logo" />
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
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)} block>
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