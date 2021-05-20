import React from 'react';
import './App.css';
import { Switch, Route, Redirect, Link, useLocation, BrowserRouter } from "react-router-dom";
import {AddCustomer, CustomersList , EditCustomer , customer } from "./components/customer";
import { SitesList } from './components/site';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { Menu } from 'antd';
type Props = {};
function App(Props: Props) {

  return (
    <BrowserRouter>
      <div>
       
        <Layout>

        <Header style={{position:'fixed', zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["customers"]}
           
          >
            <Menu.Item key="customers">
              <Link to="/customers">Customers</Link>
            </Menu.Item>
            <Menu.Item key="sites">
              <Link to="/sites">Sites</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content  style={{ padding: "0 0.5em", marginTop: 64 }}>
           <Switch>
              <Route component={SitesList} path="/sites" exact={true} />
              <Route component={CustomersList} path="/customers" exact={true} />
              <Route component={AddCustomer} path="/add"  />
              {/* <Route component={EditCustomer} path="/edit/:id" /> */}
              <Route component={() => <Redirect to="/customers" />} />
            </Switch>
        </Content>
        
           
        
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
