import React, { Component } from 'react'
import { Row, Col, Layout, Typography, Menu, Table, Tag, Space , Input , Button } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import '../../../assets/css/mahen_general.css';

const { Title} = Typography;
const { Content} = Layout;

export default class CompleteAppointmentListComponant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
        this.createPrescription = this.createPrescription.bind(this);

    }
    createPrescription = (appointmentId) =>{
      localStorage.setItem("selected_appointment",appointmentId);
      window.location.replace('/create-prescription')
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
    
    render() {
        const columns = [
            {
              title: "Id",
              key: "id",
              dataIndex: "id",
              hidden: true
            },
            {
                title: 'Name',
                dataIndex: 'fullName',
                key: 'fullName',
                render: text => <a>{text}</a>,
                ...this.getColumnSearchProps('fullName'),
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
              render: text => <a>{text}</a>,
              ...this.getColumnSearchProps('age'),
            },
            {
                title: 'Doctor',
                dataIndex: 'doctor',
                key: 'doctor',
                ...this.getColumnSearchProps('doctor'),
            },
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
                ...this.getColumnSearchProps('time'),
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              ...this.getColumnSearchProps('status'),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Tag color={'green'}>
                            <a onClick={() => this.createPrescription(record.id)}>Create Prescription</a>
                        </Tag>
                    </div>

                ),
            },
        ];
        console.log('inside child : ' , this.props.appointments)
        var appointmentList = [];
        this.props.appointments.map((item)=>{   
          var appointmentObj = {}
          appointmentObj.id = item._id;
          appointmentObj.fullName = item.patient.fullName;
          appointmentObj.age = item.patient.age;
          appointmentObj.doctor = item.doctor.fullName;
          appointmentObj.time = item.appointmentTimeSlot;
          appointmentObj.status = item.status;
          appointmentList.push(appointmentObj);
          console.log('appointment List : ' , appointmentList);
        }); 
        return (
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 16,
                    }}
                >
                    <Row justify='start'>
                        <Title level={3}>Complete Appointment List : 03/10/2021</Title>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table columns={columns} dataSource={appointmentList} pagination={{ pageSize: 3 }}/>
                        </Col>
                    </Row>
                </Content>
            </div>
        )
    }
}
