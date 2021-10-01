import React, { Component } from 'react'
import { List, Image } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  }
];



class AppointmentRecipts extends Component {
  constructor(props){
    super(props);
    this.state = {
        patient:window.localStorage.getItem('id'),
        appointments:[],
        report:[]
    }
  } 

  fetchAppointments = () =>{
    fetch('http://localhost:8090/appointment/getAll/'+this.state.patient).then(res => res.json()).then(data =>{
      this.setState({appointments: data})
      console.log(data)
    }).catch(err =>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.fetchAppointments()
  }

  handleChange = (id) => {
    console.log(id);
    let filId = ''
        this.state.appointments.filter(item => item._id === id).map(fillItem =>{
            
            console.log(fillItem._id);
            filId = fillItem._id
        })
        let url = 'http://localhost:8090/reports/get/report/appointment/' + filId;

        console.log(url);
        fetch('http://localhost:8090/reports/get/report/appointment/' + filId, {
            method: "GET",
            // headers: {
            //     Authorization: "Bearer " + window.localStorage.getItem('token')
            // }
        }).then(res => res.json()).then(data => {
            console.log("reports" + data);
            this.setState({ reports: data })
        })
  }

  render() {
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Reports</h3>

            <Select placeholder="Select Your Appointment" style={{ width: 500, marginLeft:100}} onChange={this.handleChange}>
              {this.state.appointments.map(item =>{
                return(<Select.Option value={item._id}>{item._id} | {item.appointmentDate} | {item.appointmentTimeSlot}</Select.Option>)
              })}
            </Select>
            
            <div style={{padding:'5%'}}>
              <List
                itemLayout="horizontal"
                dataSource={this.state.reports}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Image width="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png" />}
                      title={<a href={item.url} target='_blank'>{item.name}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </div>
        </div>
    )
  }
}

export default AppointmentRecipts
