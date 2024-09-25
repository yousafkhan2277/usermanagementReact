import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './sideMenu';
import { Outlet } from 'react-router-dom';  // Outlet is used to render nested routes

const DashboardLayout = () => {
    const [panelTitle, setPanelTitle] = useState('Dashboard');
  return (
    <div className="dashboard-container">
      <Header />
      <div className="page-content">
        <div className="left-side">
          <SideMenu />
        </div>
        <div className="right-side">
          <div className="row">
            <div className="col-md-12 panel-warning">
              <div className="content-box-header panel-heading">
                <div className="panel-title">{panelTitle}</div>
              </div>
              <div className="content-box-large box-with-header" style={{ height: '100%' }}>
                {/* This is where the nested routes will be rendered */}
                <Outlet  context={{ setPanelTitle }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
