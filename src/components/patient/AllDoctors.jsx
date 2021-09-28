import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import Doctor from './../../assets/img/Doctor.png'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { Avatar, Image } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const { Meta } = Card;

const onSearch = value => console.log(value);

class AllDoctors extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            doctors:[],
            visible:false,
            selectedDoc:{}
        }
    }
    fetchDoctors = () =>{
        fetch('http://localhost:8090/doctorA/get-my-name').then(res => res.json()).then(data =>{
          this.setState({doctors : data})
           console.log(data)
        }).catch(err =>{
          console.log(err);
        })
    }

    componentDidMount(){
        this.fetchDoctors()
    }

    showModal = (item) => {
        console.log(item);
        this.setState({
            visible : true,
            selectedDoc : item
        });
      };

    handleOk = () => {
        this.setState({
            visible : false
        });
    };
    
    handleCancel = () => {
        this.setState({
            visible : false
        });
    };

  render() {
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row >
                <Col span={16}></Col>
                <Col span={7}><Search placeholder="Search Doctors" onSearch={onSearch} enterButton /></Col>
                <Col span={2}></Col>
                
            </Row><br /><br />
            <Row >
                {this.state.doctors.map(item =>{
                    return(
                        <Col span={6}>
                            <Card
                                hoverable
                                style={{ width: 240}}
                                title = {item.fullName}
                                cover={<img alt="example" src={"http://localhost:8090/doctor/" + item.profileImage} style={{matgin:'2%'}}/>}
                            >
                                <Meta title={item.specialty} description="lorem xxxxxxxxx xxxxxxxxx xxxxx" />
                                <Button type="primary" onClick={() => this.showModal(item)} style={{marginTop:'5%'}}>
                                    View More
                                </Button>
                            </Card>
                        </Col>
                    )
                })}

            </Row>
            <br /><br />
            
            <Modal title={this.state.selectedDoc.fullName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Row >
                    <Col span={8}>
                        <Avatar size={120} src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}  />
                    </Col>
                    <Col span={16}>
                        <Title level={5}>Specialization</Title>
                        <p>{this.state.selectedDoc.specialty}</p>
                        <br />
                        <Title level={5}>About Doctor</Title>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Nisi ipsam corrupti voluptatibus ut itaque modi ullam in reprehenderit, 
                            quaerat corporis ea nesciunt natus dolor voluptates, 
                            asperiores aspernatur harum ducimus quibusdam.</p>
                    </Col>
                    
                </Row>
            </Modal>
            
        </div>

    )
  }
}

export default AllDoctors
