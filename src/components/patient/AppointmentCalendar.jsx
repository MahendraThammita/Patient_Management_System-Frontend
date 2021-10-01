import React, { Component } from 'react'
import { Calendar, Badge } from 'antd';

function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'success', content: 'Dr akila liyanage | 06.00' },
        ];
        break;
      case 10:
        listData = [
          { type: 'error', content: 'Dr akila liyanage | 04.15' },
        ];
        break;
      case 14:
        listData = [
          { type: 'error', content: 'Dr John Doe | 04.15' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

class AppointmentCalendar extends Component {
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div
                    style={{
                        padding:"0 5% 5% 5% ", 
                        // border:"0.1px solid black"
                    }}
                >
                    <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Schedule</h3>
                    <Calendar
                        style={{
                            // padding:"10%", 
                            // border:"0.1px solid #aaaaaa"
                        }}
                        dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                </div>
            </div>
            
        )
    }
}

export default AppointmentCalendar
