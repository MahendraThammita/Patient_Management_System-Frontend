import React, { Component } from 'react'
import { Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;

export default class RegisterStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.renderSuccessTab = this.renderSuccessTab.bind(this);
    }
    

    renderSuccessTab = () =>{
        return(
            <div>
                Hello
            </div>
        )
    }

    render() {
        const undesignedTabTitle = <div>Hello mahendra</div>
        return (
            <div>
                <Tabs type="card" tabPosition="left">
                    <TabPane tab={undesignedTabTitle} key="1">
                        Content of Tab 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab 3
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
