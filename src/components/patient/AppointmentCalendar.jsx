import React, { Component } from 'react'
import { Calendar, Badge } from 'antd';

function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
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
                        padding:"10%", 
                        // border:"0.1px solid black"
                    }}
                >
                    <h3 style={{textAlign:"center", marginTop:"1%", marginBottom:"3%"}}>My Schedule</h3>
                    <Calendar
                        style={{
                            // padding:"10%", 
                            border:"0.1px solid #aaaaaa"
                        }}
                        dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                </div>
            </div>
            
        )
    }
}

export default AppointmentCalendar
