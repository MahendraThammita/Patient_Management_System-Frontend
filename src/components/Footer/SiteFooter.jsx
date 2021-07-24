import React, { Component } from 'react';
import {Layout}  from 'antd'

const { Header, Content, Footer } = Layout;

class SiteFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Footer style={{ textAlign: 'center' }}>Patint Management System ©{new Date().getFullYear()} | made with ❤️</Footer>
        );
    }
}
 
export default SiteFooter;