import React from 'react';
import Header from './Dashboard/Header';
import Footer from './Dashboard/Footer';
import SideMenu from './Dashboard/sideMenu';
//import '../assets/css/Dashboardtest.css';
import '../assets/css/styles.css';
import '../assets/css/forms.css';

const Dashboard = () => {
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
                <div className="panel-title">Dashboard ff</div>
              </div>
              <div className="content-box-large box-with-header" style={{ height: '190px' }}>
              
                {/* Dashboard content can go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
