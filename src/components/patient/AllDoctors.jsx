import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Card } from 'antd';
import Doctor from './../../assets/img/Doctor.png'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

const { Search } = Input;

const { Meta } = Card;

const onSearch = value => console.log(value);

class AllDoctors extends Component {
    constructor(props){
        super(props);
        this.state = {
            patient:window.localStorage.getItem('id'),
            doctors:[],
            visible:false
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

    showModal = (id) => {
        this.setState({
            visible : true
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
                                <Meta title={item.specialty} description="lorem xxxxxxxxx xxxxxxxxx x x x xx" />
                                <Button type="primary" onClick={() => this.showModal(item._id)}>
                                    View More
                                </Button>
                            </Card>
                        </Col>
                    )
                })}

            </Row>
            <br /><br />
            
            <Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            
        </div>

    )
  }
}

export default AllDoctors
